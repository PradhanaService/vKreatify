import type { Client } from "../../data/clients";

type ServicesDeliveredProps = {
  client: Client;
};

export default function ServicesDelivered({ client }: ServicesDeliveredProps) {
  return (
    <section className="bg-white px-[5vw] pb-[120px] text-[#1D1D1F]">
      <p className="mb-12 text-[10px] uppercase tracking-[0.2em] text-[#86868B]">What We Built</p>

      <div className="grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
        {client.servicesDetailed.map((service) => (
          <div key={service.number} className="border-t border-black/10 pt-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="text-[11px] text-[#AEAEB2]">{service.number}</span>
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-[14px] font-[500] text-white"
                style={{ backgroundColor: client.accentColor }}
              >
                {service.icon}
              </span>
            </div>
            <h3 className="text-[20px] font-[400] tracking-[-0.02em]">{service.title}</h3>
            <p className="mt-3 text-[14px] leading-[1.65] text-[#86868B]">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
