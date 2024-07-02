export function YouTube({ title, id }: { title: string; id: string }) {
  return (
    <iframe
      className="aspect-video w-full"
      src={"https://www.youtube.com/embed/" + id}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  );
}
