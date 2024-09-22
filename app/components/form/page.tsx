import { Form1Page } from "./(components)/form1";
import { Form2Page } from "./(components)/form2";
import { Form3Page } from "./(components)/form3";
import { Form4Page } from "./(components)/form4";

export default function FormPage() {
  return (
    <div className="container">
      <Form1Page />
      <Form2Page />
      <Form3Page />
      <Form4Page />
    </div>
  );
}
