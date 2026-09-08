// Bright Scrub Cleans - MCP endpoint (Streamable HTTP over JSON-RPC)
//
// Exposed at:
//   https://brightscrubcleans.co.uk/mcp
//   https://brightscrubcleans.co.uk/.netlify/functions/mcp
//
// Discovered by AI clients via:
//   https://brightscrubcleans.co.uk/.well-known/mcp.json
//
// The endpoint is dependency-free and implements the core MCP surface:
// initialize, ping, tools/list, tools/call, resources/list, resources/read.

const SITE = "https://brightscrubcleans.co.uk";
const SERVER_NAME = "brightscrubcleans";
const PROTOCOL_VERSION = "2025-06-18";

const BUSINESS = {
  name: "Bright Scrub Cleans",
  alternateName: "BrightScrub Cleans",
  description:
    "Domestic and commercial cleaning across the West Midlands. Deep cleans, regular house cleaning, end of tenancy, office, commercial and after-builders cleaning - insured, vetted and quote-led.",
  url: SITE + "/",
  telephone: "+447722094702",
  phoneDisplay: "07722 094702",
  email: "info@brightscrubcleans.co.uk",
  whatsapp: "https://wa.me/447722094702",
  hours: "Mo-Su 08:00-20:00",
  priceRange: "$$",
  areas: [
    "Birmingham",
    "Wolverhampton",
    "Dudley",
    "Tipton",
    "Oldbury",
    "West Bromwich",
    "Wednesbury",
    "Smethwick",
    "Halesowen",
    "Stourbridge",
    "Rowley Regis",
    "Brierley Hill",
    "Kingswinford",
    "Bilston",
    "Quinton",
    "Bearwood",
    "Great Barr",
    "Edgbaston",
    "Harborne",
    "Selly Oak",
  ],
  insurance: "Fully insured with public liability cover",
  team: "Vetted, DBS-checked, uniformed team",
  products: "Professional-grade, eco-friendly products",
  responseTime: "Quotes replied to within 24 hours",
};

const SERVICES = [
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    description:
      "A detailed one-off reset for homes that need more than a maintenance clean. Kitchens, bathrooms, floors, high-touch surfaces and agreed room priorities.",
    page: "/deep-cleaning/",
  },
  {
    slug: "end-of-tenancy-cleaning",
    name: "End of Tenancy Cleaning",
    description:
      "Move-out and handover cleaning for tenants, landlords and letting agents, finished to an inventory-ready standard with photo reports available.",
    page: "/end-of-tenancy-cleaning/",
  },
  {
    slug: "regular-cleaning",
    name: "Regular House Cleaning",
    description:
      "Weekly, fortnightly or monthly home cleaning with flexible scheduling, priority rooms and the same careful standard every visit.",
    page: "/regular-cleaning/",
  },
  {
    slug: "commercial-cleaning",
    name: "Commercial Cleaning",
    description:
      "Commercial cleaning for retail, gyms, clinics, schools and industrial premises, scheduled around your business including out-of-hours.",
    page: "/commercial-cleaning/",
  },
  {
    slug: "office-cleaning",
    name: "Office Cleaning",
    description:
      "Office cleaning for desks, kitchens, washrooms and communal areas, scheduled before, during or after your working day.",
    page: "/office-cleaning/",
  },
  {
    slug: "domestic-cleaning",
    name: "Domestic Cleaning",
    description:
      "Careful home cleaning for houses, flats and rentals - one-off or on a regular schedule, quote-led and tailored to your home.",
    page: "/domestic-cleaning/",
  },
  {
    slug: "after-builders-cleaning",
    name: "After-Builders Cleaning",
    description:
      "Post-work dust and surface cleaning for renovations, extensions and new builds - safe, thorough and site-ready.",
    page: "/after-builders-cleaning/",
  },
  {
    slug: "airbnb-cleaning",
    name: "Airbnb & Short-Let Cleaning",
    description:
      "Fast, guest-ready turnovers for Airbnb, holiday lets and serviced accommodation, with fresh linen options and photo reports.",
    page: "/airbnb-cleaning/",
  },
  {
    slug: "student-accommodation-cleaning",
    name: "Student Accommodation Cleaning",
    description:
      "Cleaning for student houses, halls and HMOs - periodic cleans, end-of-tenancy resets and communal-area care.",
    page: "/student-accommodation-cleaning/",
  },
  {
    slug: "communal-area-cleaning",
    name: "Communal Area Cleaning",
    description:
      "Regular cleaning for stairwells, corridors, lifts, lobbies and bin areas in flats, apartments and shared buildings.",
    page: "/communal-area-cleaning/",
  },
  {
    slug: "carpet-upholstery-cleaning",
    name: "Carpet & Upholstery Cleaning",
    description:
      "Carpet, sofa, upholstery and mattress cleaning with hot water extraction, stain treatment and deodorising, quoted by item.",
    page: "/carpet-upholstery-cleaning/",
  },
];

const FAQ = [
  {
    question: "Are you fully insured?",
    answer:
      "Yes. Bright Scrub Cleans maintains comprehensive public liability insurance for complete peace of mind on every job.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We cover the West Midlands, including Birmingham, Wolverhampton, Dudley, Tipton, Oldbury, West Bromwich, Wednesbury, Smethwick, Halesowen, Stourbridge, Rowley Regis, Brierley Hill, Kingswinford and Bilston.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "We respond to all quote requests within 24 hours and can often accommodate bookings within a few days, subject to availability.",
  },
  {
    question: "Do you provide your own cleaning products?",
    answer:
      "Yes. We bring all professional-grade, eco-friendly cleaning products and equipment unless you request otherwise.",
  },
  {
    question: "Can I book a recurring clean?",
    answer:
      "Yes. Weekly, fortnightly and monthly cleaning plans are available to keep your space consistently fresh.",
  },
];

const RESOURCES = [
  {
    uri: "mcp://brightscrubcleans.co.uk/business",
    name: "Business information",
    mimeType: "application/json",
    description: "Contact details, hours, coverage area and trust signals for Bright Scrub Cleans.",
  },
  {
    uri: "mcp://brightscrubcleans.co.uk/services",
    name: "Services list",
    mimeType: "application/json",
    description: "All domestic and commercial cleaning services offered.",
  },
  {
    uri: "mcp://brightscrubcleans.co.uk/areas",
    name: "Areas covered",
    mimeType: "application/json",
    description: "The towns and cities served across the West Midlands.",
  },
  {
    uri: "mcp://brightscrubcleans.co.uk/faq",
    name: "Frequently asked questions",
    mimeType: "application/json",
    description: "Common questions and direct answers about booking, insurance and coverage.",
  },
  {
    uri: "mcp://brightscrubcleans.co.uk/contact",
    name: "Contact and quoting",
    mimeType: "application/json",
    description: "How to request a free quote, including phone, email and WhatsApp.",
  },
];

function jsonRpcResult(id, result) {
  return { jsonrpc: "2.0", id, result };
}

function jsonRpcError(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}

function textContent(text) {
  return { type: "text", text };
}

function resourcePayload(name, data) {
  return { name, data };
}

function handleInitialize(id) {
  return jsonRpcResult(id, {
    protocolVersion: PROTOCOL_VERSION,
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
    },
    serverInfo: {
      name: SERVER_NAME,
      version: "1.0.0",
    },
  });
}

function handleToolsList(id) {
  return jsonRpcResult(id, {
    tools: [
      {
        name: "get_business_info",
        description: "Get business details for Bright Scrub Cleans: contact info, hours, coverage, insurance and team standards.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_services",
        description: "List all cleaning services offered across the West Midlands.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_service_details",
        description: "Get details for one cleaning service, including what is included and optional extras.",
        inputSchema: {
          type: "object",
          properties: {
            service: { type: "string", description: "Service slug or name, e.g. deep-cleaning" },
          },
          required: ["service"],
        },
      },
      {
        name: "get_areas",
        description: "List the towns and cities covered across the West Midlands.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_faq",
        description: "Get frequently asked questions with direct answers.",
        inputSchema: { type: "object", properties: {} },
      },
      {
        name: "get_contact",
        description: "Get contact details and how to request a free quote.",
        inputSchema: { type: "object", properties: {} },
      },
    ],
  });
}

function handleToolsCall(id, params) {
  const tool = params && params.name;
  const args = (params && params.arguments) || {};

  if (tool === "get_business_info") {
    return jsonRpcResult(id, {
      content: [textContent(JSON.stringify(BUSINESS, null, 2))],
    });
  }

  if (tool === "get_services") {
    return jsonRpcResult(id, {
      content: [textContent(JSON.stringify(SERVICES, null, 2))],
    });
  }

  if (tool === "get_service_details") {
    const wanted = String(args.service || "").toLowerCase();
    const service = SERVICES.find(
      (s) => s.slug === wanted || s.name.toLowerCase() === wanted
    );
    if (!service) {
      return jsonRpcResult(id, {
        content: [
          textContent(
            "Service not found. Available services: " +
              SERVICES.map((s) => s.name).join(", ")
          ),
        ],
        isError: true,
      });
    }
    return jsonRpcResult(id, {
      content: [textContent(JSON.stringify(service, null, 2))],
    });
  }

  if (tool === "get_areas") {
    return jsonRpcResult(id, {
      content: [textContent(JSON.stringify(BUSINESS.areas, null, 2))],
    });
  }

  if (tool === "get_faq") {
    return jsonRpcResult(id, {
      content: [textContent(JSON.stringify(FAQ, null, 2))],
    });
  }

  if (tool === "get_contact") {
    return jsonRpcResult(id, {
      content: [
        textContent(
          JSON.stringify(
            {
              phone: BUSINESS.telephone,
              phoneDisplay: BUSINESS.phoneDisplay,
              email: BUSINESS.email,
              whatsapp: BUSINESS.whatsapp,
              quotePage: SITE + "/contact.html",
              responseTime: BUSINESS.responseTime,
            },
            null,
            2
          )
        ),
      ],
    });
  }

  return jsonRpcError(id, -32602, "Unknown tool: " + tool);
}

function handleResourcesList(id) {
  return jsonRpcResult(id, {
    resources: RESOURCES,
  });
}

function handleResourcesRead(id, params) {
  const uri = params && params.uri;
  const payloads = {
    "mcp://brightscrubcleans.co.uk/business": resourcePayload("Business information", BUSINESS),
    "mcp://brightscrubcleans.co.uk/services": resourcePayload("Services list", SERVICES),
    "mcp://brightscrubcleans.co.uk/areas": resourcePayload("Areas covered", BUSINESS.areas),
    "mcp://brightscrubcleans.co.uk/faq": resourcePayload("Frequently asked questions", FAQ),
    "mcp://brightscrubcleans.co.uk/contact": resourcePayload(
      "Contact and quoting",
      {
        phone: BUSINESS.telephone,
        email: BUSINESS.email,
        whatsapp: BUSINESS.whatsapp,
        quotePage: SITE + "/contact.html",
      }
    ),
  };

  const payload = payloads[uri];
  if (!payload) {
    return jsonRpcError(id, -32002, "Resource not found: " + uri);
  }
  return jsonRpcResult(id, {
    contents: [
      {
        uri,
        mimeType: "application/json",
        text: JSON.stringify(payload.data, null, 2),
      },
    ],
  });
}

function dispatch(message) {
  if (!message || message.jsonrpc !== "2.0" || typeof message.id !== "number") {
    return jsonRpcError(message && message.id, -32600, "Invalid JSON-RPC message");
  }
  const method = message.method;
  const params = message.params;

  switch (method) {
    case "initialize":
      return handleInitialize(message.id);
    case "ping":
      return jsonRpcResult(message.id, {});
    case "tools/list":
      return handleToolsList(message.id);
    case "tools/call":
      return handleToolsCall(message.id, params);
    case "resources/list":
      return handleResourcesList(message.id);
    case "resources/read":
      return handleResourcesRead(message.id, params);
    case "notifications/initialized":
    case "notifications/cancelled":
      return null; // notifications have no response
    default:
      return jsonRpcError(message.id, -32601, "Method not found: " + method);
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id",
  "Access-Control-Expose-Headers": "MCP-Protocol-Version, Mcp-Session-Id",
  "Cache-Control": "no-store",
};

export async function handler(event) {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  if (event.httpMethod === "GET") {
    // Streamable HTTP allows GET for server streams; Netlify functions are
    // request/response, so we expose the endpoint info as JSON instead.
    return {
      statusCode: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: SERVER_NAME,
        protocolVersion: PROTOCOL_VERSION,
        transport: "streamable-http",
        message: "Send JSON-RPC POST requests to this endpoint.",
      }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let message;
  try {
    message = JSON.parse(event.body || "{}");
  } catch (err) {
    return {
      statusCode: 400,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }),
    };
  }

  const result = dispatch(message);
  const headers = {
    ...CORS_HEADERS,
    "Content-Type": "application/json",
    "MCP-Protocol-Version": PROTOCOL_VERSION,
  };

  if (result === null) {
    return { statusCode: 202, headers, body: "" };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result),
  };
}
