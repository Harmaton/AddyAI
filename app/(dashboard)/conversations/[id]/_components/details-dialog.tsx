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
  // Check if loanDetails exist
  if (!email.loanDetails) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-violet-500" variant="outline">Loan Details</Button>
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
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div id="name" className="col-span-3">
              {email.loanDetails.name || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <div id="phone" className="col-span-3">
              {email.loanDetails.contacts?.phone || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div id="email" className="col-span-3">
              {email.loanDetails.contacts?.email || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <div id="address" className="col-span-3">
              {email.loanDetails.address || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="urgency" className="text-right">
              Urgency
            </Label>
            <div id="urgency" className="col-span-3">
              {email.loanDetails.urgency || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="loanAmount" className="text-right">
              Loan Amount
            </Label>
            <div id="loanAmount" className="col-span-3">
              {email.loanDetails.loanAmount ? `$${email.loanDetails.loanAmount}` : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="interestRate" className="text-right">
              Interest Rate
            </Label>
            <div id="interestRate" className="col-span-3">
              {email.loanDetails.interestRate ? `${(email.loanDetails.interestRate * 100).toFixed(2)}%` : 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="term" className="text-right">
              Term
            </Label>
            <div id="term" className="col-span-3">
              {email.loanDetails.term || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employmentStatus" className="text-right">
              Employment Status
            </Label>
            <div id="employmentStatus" className="col-span-3">
              {email.loanDetails.employmentStatus || 'N/A'}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="annualIncome" className="text-right">
              Annual Income
            </Label>
            <div id="annualIncome" className="col-span-3">
              {email.loanDetails.annualIncome ? `$${email.loanDetails.annualIncome}` : 'N/A'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
