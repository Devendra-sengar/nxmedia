import express, { Request, Response } from 'express';
//import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Load email configs from ENV with user defaults
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'prathamjoshi355@gmail.com';
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'prathamjoshi355@gmail.com';
const RECEIPT_EMAIL = process.env.RECEIPT_EMAIL || 'prathamjoshi355@gmail.com';

// Template 1: Notification Email sent TO the owner (from SENDER_EMAIL)
function buildOwnerNotificationEmailHtml(data: {
  name: string;
  email: string;
  organization: string;
  website: string;
  description: string;
  date: string;
  referenceId: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>NX Media Contact Submission</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9ff; margin: 0; padding: 24px; color: #141b2b; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #dce2f7; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
      .header { background: #141b2b; color: #ffffff; padding: 24px 28px; }
      .brand { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase; margin: 0; color: #ffffff; }
      .subbrand { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; margin-top: 4px; }
      .content { padding: 28px; }
      .badge { display: inline-block; padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; background: #e2e8f0; color: #09090b; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
      .title { font-size: 18px; font-weight: 700; margin: 0 0 16px 0; color: #141b2b; }
      .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      .table td { padding: 10px 0; border-bottom: 1px solid #f1f3ff; font-size: 14px; }
      .table td.label { width: 35%; color: #5c3f40; font-weight: 600; }
      .table td.val { width: 65%; color: #141b2b; font-weight: 500; }
      .message-box { background: #f8fafc; border-left: 3px solid #141b2b; padding: 14px 18px; border-radius: 0 6px 6px 0; margin-top: 12px; font-size: 14px; line-height: 1.6; color: #141b2b; }
      .footer { background: #f9f9ff; padding: 16px 28px; text-align: center; border-top: 1px solid #dce2f7; font-size: 12px; color: #71717a; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="brand">NX MEDIA</h1>
        <div class="subbrand">NexisparkX Group Division · Inbound Client Inquiry</div>
      </div>
      <div class="content">
        <span class="badge">Ref #${data.referenceId}</span>
        <h2 class="title">New Client Brief Received</h2>
        <table class="table">
          <tr>
            <td class="label">Client Name</td>
            <td class="val">${data.name}</td>
          </tr>
          <tr>
            <td class="label">Client Email</td>
            <td class="val"><a href="mailto:${data.email}" style="color:#09090b;font-weight:600;">${data.email}</a></td>
          </tr>
          <tr>
            <td class="label">Organization</td>
            <td class="val">${data.organization || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="label">Website</td>
            <td class="val">${data.website ? `<a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank">${data.website}</a>` : 'Not provided'}</td>
          </tr>
          <tr>
            <td class="label">Submission Date</td>
            <td class="val">${data.date}</td>
          </tr>
        </table>

        <div style="font-weight:600;font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#5c3f40;">Project Description / Request:</div>
        <div class="message-box">
          ${data.description.replace(/\n/g, '<br/>')}
        </div>
      </div>
      <div class="footer">
        Dispatched to ${RECIPIENT_EMAIL} via NX Media Automation Service
      </div>
    </div>
  </body>
  </html>
  `;
}

// Template 2: Official Receipt / Acknowledgment Email (sent to client + copy to RECEIPT_EMAIL)
function buildClientReceiptEmailHtml(data: {
  name: string;
  email: string;
  organization: string;
  website: string;
  description: string;
  date: string;
  referenceId: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>NX Media Inquiry Receipt</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f9f9ff; margin: 0; padding: 24px; color: #141b2b; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #dce2f7; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
      .header { background: #141b2b; color: #ffffff; padding: 24px 28px; }
      .brand { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; text-transform: uppercase; margin: 0; color: #ffffff; }
      .subbrand { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a1a1aa; margin-top: 4px; }
      .content { padding: 28px; }
      .status-pill { display: inline-block; padding: 5px 12px; border-radius: 4px; font-size: 11px; font-weight: 700; background: #dcfce7; color: #15803d; margin-bottom: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
      .title { font-size: 18px; font-weight: 700; margin: 0 0 12px 0; color: #141b2b; }
      .intro { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 20px; }
      .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; background: #f8fafc; border-radius: 6px; padding: 12px; }
      .table td { padding: 9px 12px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
      .table td.label { width: 35%; color: #64748b; font-weight: 600; }
      .table td.val { width: 65%; color: #0f172a; font-weight: 500; }
      .receipt-box { background: #f8fafc; border-left: 3px solid #16a34a; padding: 14px 18px; border-radius: 0 6px 6px 0; margin-top: 12px; font-size: 13px; line-height: 1.6; color: #1e293b; }
      .footer { background: #f9f9ff; padding: 18px 28px; text-align: center; border-top: 1px solid #dce2f7; font-size: 12px; color: #71717a; line-height: 1.5; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="brand">NX MEDIA</h1>
        <div class="subbrand">NexisparkX Group Division · Inquiry Receipt</div>
      </div>
      <div class="content">
        <span class="status-pill">Receipt Confirmed · Ref #${data.referenceId}</span>
        <h2 class="title">Official Inquiry Receipt</h2>
        <p class="intro">
          Hello ${data.name},<br/><br/>
          Thank you for reaching out to <strong>NX Media</strong>. This email confirms that your project brief has been logged into our executive review pipeline.
        </p>

        <div style="font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;margin-bottom:8px;">
          Receipt Details:
        </div>
        <table class="table">
          <tr>
            <td class="label">Reference ID</td>
            <td class="val"><strong>#${data.referenceId}</strong></td>
          </tr>
          <tr>
            <td class="label">Name</td>
            <td class="val">${data.name}</td>
          </tr>
          <tr>
            <td class="label">Organization</td>
            <td class="val">${data.organization || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="label">Website</td>
            <td class="val">${data.website || 'Not provided'}</td>
          </tr>
          <tr>
            <td class="label">Date Logged</td>
            <td class="val">${data.date}</td>
          </tr>
        </table>

        <div style="font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#64748b;">
          Submitted Summary:
        </div>
        <div class="receipt-box">
          ${data.description.replace(/\n/g, '<br/>')}
        </div>

        <p style="font-size:13px;color:#475569;margin-top:20px;line-height:1.6;">
          Our leadership team will evaluate your brief and communicate directly with you at <strong>${data.email}</strong>.
        </p>
      </div>
      <div class="footer">
        © 2025 NX Media. A NexisparkX Group Division.<br/>
        This is an automated confirmation receipt. For inquiries, contact <a href="mailto:${SENDER_EMAIL}" style="color:#09090b;">${SENDER_EMAIL}</a>.
      </div>
    </div>
  </body>
  </html>
  `;
}

// Nodemailer transport factory
async function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return {
      transporter: nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }),
      isTest: false,
    };
  }

  try {
    const testAccount = await nodemailer.createTestAccount();
    return {
      transporter: nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      }),
      isTest: true,
    };
  } catch {
    return {
      transporter: nodemailer.createTransport({
        jsonTransport: true,
      }),
      isTest: true,
    };
  }
}

// API: Send email (Dispatches 2 emails: Notification to owner + Receipt to client)
app.post('/api/send-email', async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      organization = '',
      website = '',
      description = '',
    } = req.body;

    // Validate required fields
    if (!name || !email || !description) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and description.',
      });
    }

    const referenceId = `NX-${Date.now().toString().slice(-6)}`;
    const submissionDate = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    // Setup Nodemailer transporter
    const { transporter } = await createTransporter();

    // ----------------------------------------------------
    // EMAIL 1: Notification sent TO the owner (जिससे मेरे को मेल आएगा)
    // Sent to RECIPIENT_EMAIL from SENDER_EMAIL
    // ----------------------------------------------------
    const ownerSubject = `[NX Media Inquiry] New Submission from ${name} - ${organization || 'Individual'}`;
    const ownerHtml = buildOwnerNotificationEmailHtml({
      name,
      email,
      organization,
      website,
      description,
      date: submissionDate,
      referenceId,
    });
    const ownerText = `
NX MEDIA - New Client Inquiry
Ref: #${referenceId}
----------------------------------------
Name: ${name}
Email: ${email}
Organization: ${organization || 'N/A'}
Website: ${website || 'N/A'}
Date: ${submissionDate}

Description:
${description}
    `.trim();

    const ownerInfo = await transporter.sendMail({
      from: `"NX Media Lead" <${SENDER_EMAIL}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: ownerSubject,
      text: ownerText,
      html: ownerHtml,
    });

    // ----------------------------------------------------
    // EMAIL 2: Receipt email (एक रिसिप्ट का मेल)
    // Sent to the client (email) + copy to RECEIPT_EMAIL
    // Sent from SENDER_EMAIL
    // ----------------------------------------------------
    const receiptSubject = `[Receipt] Inquiry Acknowledgment #${referenceId} - NX Media`;
    const receiptHtml = buildClientReceiptEmailHtml({
      name,
      email,
      organization,
      website,
      description,
      date: submissionDate,
      referenceId,
    });
    const receiptText = `
NX MEDIA - Official Inquiry Receipt
Ref: #${referenceId}
----------------------------------------
Dear ${name},

Thank you for contacting NX Media. We have received your project inquiry.
Date: ${submissionDate}
Organization: ${organization || 'N/A'}
Website: ${website || 'N/A'}

Summary of your request:
${description}

Our team will communicate with you shortly.
    `.trim();

    const receiptInfo = await transporter.sendMail({
      from: `"NX Media" <${SENDER_EMAIL}>`,
      to: email,
      cc: RECEIPT_EMAIL !== email ? RECEIPT_EMAIL : undefined,
      subject: receiptSubject,
      text: receiptText,
      html: receiptHtml,
    });

    return res.json({
      success: true,
      message: 'Inquiry and receipt sent successfully.',
      referenceId,
      ownerMessageId: ownerInfo.messageId,
      receiptMessageId: receiptInfo.messageId,
    });
  } catch (err: any) {
    // Robust Node / Nodemailer error handling
    console.error('Nodemailer Error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process email delivery via Nodemailer.',
      details: err?.message || 'Mail transport error',
    });
  }
});

// Development vs Production serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares as any);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
