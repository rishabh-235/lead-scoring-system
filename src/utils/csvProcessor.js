import Papa from "papaparse";

const processCSV = (buffer) => {
  return new Promise((resolve, reject) => {
    const csvString = buffer.toString();
    Papa.parse(csvString, {
      header: true,
      complete: (results) => {
        const leads = results.data.map((lead) => ({
          name: lead.name,
          role: lead.role,
          company: lead.company,
          industry: lead.industry,
          location: lead.location,
          linkedinBio: lead.linkedinBio || "",
          intentClassification: "Low",
          score: {
            ruleBasedScore: 0,
            aiBasedScore: 0,
            totalScore: 0,
          },
        }));
        resolve(leads);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export { processCSV };
