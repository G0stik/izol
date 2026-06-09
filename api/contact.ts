import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

interface QuoteRequestBody {
  name?: string
  company?: string
  email?: string
  phone?: string
  subject?: string
  material?: string
  quantity?: string
  deadline?: string
  message?: string
}

const companyContact = {
  name: 'Izol systém, s.r.o.',
  email: 'info@izol-system.sk',
  phone: '+421 903 728 371',
  salesPhone: '+421 903 770 121',
  address: 'Zlatovská 1292/24, 911 05 Trenčín',
  website: 'https://www.tepelneizolacie.sk',
  contactUrl: 'https://www.tepelneizolacie.sk/contact',
  productsUrl: 'https://www.tepelneizolacie.sk/products'
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const normalizeValue = (value: unknown) =>
  typeof value === 'string' ? value.trim() : ''

const requiredEnv = (key: string) => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`)
  }
  return value
}

const debugEnabled = () => process.env.SMTP_DEBUG !== 'false'

const debugLog = (message: string, meta?: Record<string, unknown>) => {
  if (!debugEnabled()) return

  if (meta) {
    console.log(`[contact-api] ${message}`, meta)
    return
  }

  console.log(`[contact-api] ${message}`)
}

const renderRows = (rows: Array<[string, string]>) =>
  rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#64748b;width:170px;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#0f172a;font-weight:600;">${escapeHtml(value).replace(/\n/g, '<br>')}</td>
        </tr>
      `
    )
    .join('')

const renderEmailLayout = (title: string, intro: string, body: string) => `
  <div style="margin:0;padding:0;background:#f6f7f9;font-family:Arial,sans-serif;color:#0f172a;">
    <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
      <div style="background:#101826;color:#ffffff;padding:22px 24px;border-top:5px solid #c81f2d;">
        <div style="font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#ffced3;font-weight:700;">Izol systém, s.r.o.</div>
        <h1 style="margin:8px 0 0;font-size:28px;line-height:1.15;">${escapeHtml(title)}</h1>
      </div>
      <div style="background:#ffffff;padding:24px;border:1px solid #e5e7eb;">
        <p style="margin:0 0 18px;color:#334155;line-height:1.6;">${escapeHtml(intro)}</p>
        ${body}
      </div>
      <div style="padding:18px 24px;background:#ffffff;border:1px solid #e5e7eb;border-top:0;color:#475569;line-height:1.55;">
        <strong style="display:block;color:#0f3a66;margin-bottom:6px;">${companyContact.name}</strong>
        <div>${companyContact.address}</div>
        <div><a href="tel:${companyContact.phone.replace(/\s/g, '')}" style="color:#0f3a66;">${companyContact.phone}</a> / <a href="mailto:${companyContact.email}" style="color:#0f3a66;">${companyContact.email}</a></div>
        <div style="margin-top:10px;">
          <a href="${companyContact.contactUrl}" style="color:#c81f2d;font-weight:700;">Kontakt</a>
          <span style="color:#94a3b8;"> | </span>
          <a href="${companyContact.productsUrl}" style="color:#c81f2d;font-weight:700;">Produkty</a>
          <span style="color:#94a3b8;"> | </span>
          <a href="${companyContact.website}" style="color:#c81f2d;font-weight:700;">Web</a>
        </div>
      </div>
    </div>
  </div>
`

export default async function handler(req: VercelRequest, res: VercelResponse) {
  debugLog('request received', {
    method: req.method,
    url: req.url
  })

  if (req.method !== 'POST') {
    debugLog('method rejected', { method: req.method })
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const body = req.body as QuoteRequestBody
    const name = normalizeValue(body.name)
    const company = normalizeValue(body.company)
    const email = normalizeValue(body.email)
    const phone = normalizeValue(body.phone)
    const subject = normalizeValue(body.subject) || 'Žiadosť o cenovú ponuku'
    const material = normalizeValue(body.material)
    const quantity = normalizeValue(body.quantity)
    const deadline = normalizeValue(body.deadline)
    const message = normalizeValue(body.message)

    debugLog('payload normalized', {
      hasName: Boolean(name),
      hasCompany: Boolean(company),
      hasEmail: Boolean(email),
      hasPhone: Boolean(phone),
      hasSubject: Boolean(subject),
      hasMaterial: Boolean(material),
      hasQuantity: Boolean(quantity),
      hasDeadline: Boolean(deadline),
      messageLength: message.length
    })

    if (!name || !email || !phone || !message) {
      debugLog('validation failed: missing required fields')
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      debugLog('validation failed: invalid email', { email })
      return res.status(400).json({ error: 'Invalid email address' })
    }

    const rows: Array<[string, string]> = [
      ['Meno', name],
      ['Firma', company],
      ['Email', email],
      ['Telefón', phone],
      ['Predmet', subject],
      ['Materiál / použitie', material],
      ['Množstvo / rozsah', quantity],
      ['Termín', deadline],
      ['Správa', message]
    ]

    const smtpHost = requiredEnv('SMTP_HOST')
    const smtpPort = Number(process.env.SMTP_PORT ?? 587)
    const smtpSecure = process.env.SMTP_SECURE === 'true'
    const smtpUser = requiredEnv('SMTP_USER')
    const smtpPass = requiredEnv('SMTP_PASS')

    debugLog('smtp config loaded', {
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      user: smtpUser,
      hasPassword: Boolean(smtpPass),
      from: process.env.SMTP_FROM || `Izol systém <${smtpUser}>`,
      to: process.env.QUOTE_TO_EMAIL || companyContact.email
    })

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    })

    debugLog('smtp verify started')
    await transporter.verify()
    debugLog('smtp verify succeeded')

    const from = process.env.SMTP_FROM || `Izol systém <${smtpUser}>`
    const to = process.env.QUOTE_TO_EMAIL || companyContact.email

    const table = `
      <table style="border-collapse:collapse;width:100%;border:1px solid #e5e7eb;margin:18px 0;">
        <tbody>${renderRows(rows)}</tbody>
      </table>
    `

    debugLog('sending company email', {
      from,
      to,
      replyTo: email,
      subject: `Cenová ponuka: ${subject}`
    })

    const companyResult = await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Cenová ponuka: ${subject}`,
      html: renderEmailLayout(
        'Nová žiadosť o cenovú ponuku',
        'Na webe bola odoslaná nová žiadosť o cenovú ponuku.',
        table
      ),
      text: rows
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`)
        .join('\n')
    })

    debugLog('company email sent', {
      messageId: companyResult.messageId,
      accepted: companyResult.accepted,
      rejected: companyResult.rejected,
      response: companyResult.response
    })

    debugLog('sending customer confirmation', {
      from,
      to: email,
      replyTo: companyContact.email
    })

    const customerResult = await transporter.sendMail({
      from,
      to: email,
      replyTo: companyContact.email,
      subject: 'Potvrdenie prijatia žiadosti o cenovú ponuku',
      html: renderEmailLayout(
        'Vaša žiadosť bola odoslaná',
        'Ďakujeme, vašu správu sme prijali. Nižšie nájdete kópiu odoslanej žiadosti a priame možnosti kontaktovania.',
        `
          ${table}
          <div style="background:#f8fafc;border-left:4px solid #c81f2d;padding:14px 16px;margin-top:18px;">
            <strong style="display:block;color:#0f172a;margin-bottom:6px;">Možnosti kontaktovania</strong>
            <div>Meno: ${companyContact.name}</div>
            <div>Email: <a href="mailto:${companyContact.email}" style="color:#0f3a66;">${companyContact.email}</a></div>
            <div>Telefón: <a href="tel:${companyContact.phone.replace(/\s/g, '')}" style="color:#0f3a66;">${companyContact.phone}</a></div>
            <div>Obchod: <a href="tel:${companyContact.salesPhone.replace(/\s/g, '')}" style="color:#0f3a66;">${companyContact.salesPhone}</a></div>
            <div>Sídlo: ${companyContact.address}</div>
          </div>
        `
      ),
      text: [
        'Ďakujeme, vašu správu sme prijali.',
        '',
        ...rows.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
        '',
        `${companyContact.name}`,
        companyContact.address,
        `${companyContact.email} / ${companyContact.phone}`,
        companyContact.website
      ].join('\n')
    })

    debugLog('customer confirmation sent', {
      messageId: customerResult.messageId,
      accepted: customerResult.accepted,
      rejected: customerResult.rejected,
      response: customerResult.response
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Error sending quote request:', error)
    const message = error instanceof Error ? error.message : 'Failed to send email'
    return res.status(500).json({ error: 'Failed to send email', message })
  }
}
