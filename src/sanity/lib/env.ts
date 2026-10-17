const assertValue = (value: string | undefined, errorMessage: string) => {
  if (!value) {
    throw new Error(errorMessage);
  }

  return value;
};

export const apiVersion = "2026-10-16";
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing NEXT_PUBLIC_SANITY_DATASET in the environment",
);
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing NEXT_PUBLIC_SANITY_PROJECT_ID in the environment",
);
