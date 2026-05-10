import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClientDetail from "./ClientDetail";
import { clients, getClientBySlug, getNextClient } from "../../../data/clients";

type ClientPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return clients.map((client) => ({
    slug: client.slug,
  }));
}

export async function generateMetadata({ params }: ClientPageProps): Promise<Metadata> {
  const { slug } = await params;
  const client = getClientBySlug(slug);

  if (!client) {
    return {
      title: "Client Not Found | vKreatify",
    };
  }

  return {
    title: `${client.name} | vKreatify`,
    description: client.tagline,
  };
}

export default async function ClientPage({ params }: ClientPageProps) {
  const { slug } = await params;
  const client = getClientBySlug(slug);

  if (!client) {
    notFound();
  }

  const nextClient = getNextClient(client.slug);

  if (!nextClient) {
    notFound();
  }

  return <ClientDetail client={client} nextClient={nextClient} />;
}
