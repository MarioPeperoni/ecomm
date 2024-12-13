interface ProductDescriptionProps {
  description: string;
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Description</h2>
      <span className="whitespace-pre-line text-muted-foreground">
        {description}
      </span>
    </section>
  );
}
