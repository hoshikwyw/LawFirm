"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { sendEmail, type SendEmailState } from "@/app/actions/sendEmail";

const LEGAL_DISCLAIMER =
  "I understand that contacting this firm does not create an attorney-client relationship.";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState<SendEmailState | null, FormData>(
    sendEmail,
    null
  );
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  return (
    <form action={formAction} className="grid w-full max-w-md gap-6">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          required
          disabled={isPending}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          disabled={isPending}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="legalInquiry">Legal inquiry</Label>
        <Textarea
          id="legalInquiry"
          name="legalInquiry"
          placeholder="Describe your legal matter or question..."
          required
          rows={5}
          disabled={isPending}
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          type="hidden"
          name="disclaimer"
          value={disclaimerChecked ? "on" : ""}
          aria-hidden
        />
        <Checkbox
          id="disclaimer"
          checked={disclaimerChecked}
          onCheckedChange={(checked) => setDisclaimerChecked(checked === true)}
          disabled={isPending}
          aria-describedby="disclaimer-description"
          aria-required="true"
        />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="disclaimer"
            id="disclaimer-description"
            className="text-sm font-normal cursor-pointer text-deep-charcoal/90"
          >
            {LEGAL_DISCLAIMER}
            <span className="text-muted-gold ml-0.5" aria-hidden> *</span>
          </Label>
        </div>
      </div>
      {state?.message && (
        <p
          role="alert"
          className={
            state.success
              ? "text-sm text-muted-gold"
              : "text-sm text-red-600 dark:text-red-400"
          }
        >
          {state.message}
        </p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
}
