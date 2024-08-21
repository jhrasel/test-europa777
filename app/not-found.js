import { redirect } from "next/navigation";

export default function NotFound() {
  redirect("/");
  return (
    <html>
      <body>
        <h2
          className="!text-center mt-5 font-bold flex items-center justify-center"
          style={{ textAlign: "center" }}
        >
          404 page not found
        </h2>
      </body>
    </html>
  );
}
