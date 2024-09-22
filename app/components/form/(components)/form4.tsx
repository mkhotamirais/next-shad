"use client";

import { useFormState, useFormStatus } from "react-dom";
import { onFormPostAction } from "./form4Action";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full">
      {pending ? "loading..." : "submit"}
    </Button>
  );
}

export function Form4Page() {
  const [state, action] = useFormState(onFormPostAction, {
    message: "",
    // errors: undefined,
    // fieldValues: {
    //   age: "",
    //   name: ""
    // }
  });

  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.message === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  const [first, setFirst] = useState("");
  return (
    <div>
      <form ref={formRef} action={action} className="space-y-3 max-w-xl mx-auto my-8">
        <h1>useFormState & useFormStatus</h1>
        <Input type="text" name="name" id="name" value={first} onChange={(e) => setFirst(e.target.value)} />
        {state.message === "success" && <div>berhasil</div>}

        <SubmitButton />
      </form>
    </div>
  );
}
