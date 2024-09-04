
import { EmailTemplate } from '@/app/(dashboard)/conversations/[id]/_components/email-template';
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {
  try {
    const { to, subject, replyContent } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'ADDI <addiai@test>',
      to: [to],
      subject: subject,
      react: EmailTemplate({ to, subject, replyContent }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
