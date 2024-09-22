"use server";

type FormState = { message: string };

export async function onFormPostAction(prevState: FormState, data: FormData) {
  console.log(data);
  // await new Promise((resolve) => setTimeout(resolve, 2000));

  return { message: "form data processed" };
}
