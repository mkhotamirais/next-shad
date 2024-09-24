import CreateGalleryForm from "./create-gallery-form";

export default function GalleryPage() {
  return (
    <div className="py-4">
      <h1 className="text-lg text-primary font-semibold">Create Gallery</h1>
      <CreateGalleryForm />
    </div>
  );
}
