"use client";

import { useEffect, useLayoutEffect } from "react";
import BriefSection from "../../../components/client/BriefSection";
import ClientHero from "../../../components/client/ClientHero";
import FullBleedImage from "../../../components/client/FullBleedImage";
import ImageStack from "../../../components/client/ImageStack";
import IntroStatement from "../../../components/client/IntroStatement";
import MetricsDashboard from "../../../components/client/MetricsDashboard";
import NextClientBlock from "../../../components/client/NextClientBlock";
import PhotoGrid from "../../../components/client/PhotoGrid";
import ProcessSteps from "../../../components/client/ProcessSteps";
import ServicesDelivered from "../../../components/client/ServicesDelivered";
import TestimonialQuote from "../../../components/client/TestimonialQuote";
import type { Client } from "../../../data/clients";
import { useCursorContext } from "../../../context/CursorContext";

type ClientDetailProps = {
  client: Client;
  nextClient: Client;
};

export default function ClientDetail({ client, nextClient }: ClientDetailProps) {
  const { setCompany } = useCursorContext();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    const frame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [client.slug]);

  useEffect(() => {
    setCompany(client.slug);

    return () => {
      setCompany(null);
    };
  }, [client.slug, setCompany]);

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        color: "#1D1D1F",
      }}
    >
      <ClientHero client={client} />
      <IntroStatement client={client} />
      <ImageStack client={client} />
      <BriefSection client={client} />
      <ServicesDelivered client={client} />
      <FullBleedImage client={client} />
      <ProcessSteps client={client} />
      <MetricsDashboard client={client} />
      <TestimonialQuote client={client} />
      <PhotoGrid client={client} />
      <NextClientBlock client={nextClient} />
    </main>
  );
}
