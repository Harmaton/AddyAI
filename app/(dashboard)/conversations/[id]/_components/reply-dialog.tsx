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
  const [replyContent, setReplyContent] = useState("");

  const handleReply = () => {
    console.log("Replying with:", replyContent);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Reply</Button>
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
              value={email.headers.from}
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
