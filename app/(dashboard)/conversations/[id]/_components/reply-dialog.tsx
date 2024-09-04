import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function ReplyDialog({ email }: { email: Email }) {
  const [replyContent, setReplyContent] = useState(email.generatedResponse);
  const [open, setOpen] = useState(false);

  const handleReply = async () => {
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: email.envelope.from,
          subject: `Re: ${email.headers.subject}`,
          replyContent: replyContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      const result = await response.json();
      console.log("Email sent successfully:", result);
      setOpen(false); // Close the modal after sending
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">AI Reply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Reply to Email</DialogTitle>
          <DialogDescription>
            Compose your reply to the email. Address each point if necessary.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="to" className="text-right">
              To
            </Label>
            <Input
              id="to"
              value={email.envelope.from}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="subject" className="text-right">
              Subject
            </Label>
            <Input
              id="subject"
              value={`Re: ${email.headers.subject}`}
              readOnly
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="reply" className="text-right pt-2">
              Reply
            </Label>
            <Textarea
              id="reply"
              className="col-span-3"
              rows={10}
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Compose your reply here..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleReply}>Send Reply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
