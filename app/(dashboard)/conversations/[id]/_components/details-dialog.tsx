import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export function DetailsDialog({ email }: { email: Email }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Loan Details</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Loan Details</DialogTitle>
          <DialogDescription>
            View the details of the loan application.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loanAmount" className="text-right">
              Loan Amount
            </Label>
            <div id="loanAmount" className="col-span-3">
              ${email.loanDetails.loanAmount}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interestRate" className="text-right">
              Interest Rate
            </Label>
            <div id="interestRate" className="col-span-3">
              {(email.loanDetails.interestRate * 100).toFixed(2)}%
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="term" className="text-right">
              Term
            </Label>
            <div id="term" className="col-span-3">
              {email.loanDetails.term}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
