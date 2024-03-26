import React, { useEffect, useState } from "react";
import { API } from "@stoplight/elements";
import BrowserOnly from "@docusaurus/BrowserOnly";
// TODO: Look into defining source order for compiling from component earlier to prevent specificity issues
// import "@stoplight/elements/styles.min.css";

const ApiExplorer = ({ network, layout }: ApiExplorerProps) => {
  const [specContent, setSpecContent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchAndFixSpec = async () => {
      // Get the spec file.
      const data = await fetch(
        `https://raw.githubusercontent.com/aptos-labs/aptos-core/${network}/api/doc/spec.json`,
      );
      // Convert the data to json.
      const json = await data.json();
      // Change the `servers` field in the spec file to point to the public
      // API fullnode for that network.
      json.servers = [{ url: `https://api.${network}.aptoslabs.com/v1` }];

      // This removes the `application/x-bcs` content type from the spec file, so it
      // properly shows the JSON response in the API explorer.  Note that, this means it doesn't show in the spec for,
      // bcs, but it is poorly documented anyway.  Let's opt for a better docs experience.
      Object.keys(json.paths).forEach((key, _) => {
        // This only applies to GET, because it's the only
        if (
          json.paths[key].hasOwnProperty("get") &&
          json.paths[key].get.responses.hasOwnProperty("200")
        )
          delete json.paths[key].get?.responses["200"].content[
            "application/x-bcs"
          ];
      });

      // Set state with the updated spec.
      if (isMounted) {
        setSpecContent(json);
      }
    };

    // Call the function to get and fix the spec.
    fetchAndFixSpec().catch((err) =>
      console.log(`Error fetching spec: ${err}`),
    );

    return () => {
      isMounted = false;
    };
  }, []);

  // BrowserOnly is important here because of details re SSR:
  // https://docusaurus.io/docs/advanced/ssg#browseronly
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return (
          <API
            apiDescriptionDocument={specContent}
            router="hash"
            layout={layout}
          />
        );
      }}
    </BrowserOnly>
  );
};

interface ApiExplorerProps {
  network: string;
  layout: "sidebar" | "stacked";
}

export default ApiExplorer;
