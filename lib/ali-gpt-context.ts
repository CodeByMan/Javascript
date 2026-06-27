import {
  certifications,
  contact,
  education,
  experience,
  profile,
  projects,
  skillCategories,
  sliderSkills,
} from "@/data/portfolio";

export type AliGPTMenuState =
  | "main"
  | "skills"
  | "experience"
  | "projects"
  | "follow-up"
  | "stopped";

export type AliGPTOption = {
  value: string;
  label: string;
};

export type AliGPTReply = {
  reply: string;
  nextState: AliGPTMenuState;
  options: AliGPTOption[];
};

const MAIN_OPTIONS: AliGPTOption[] = [
  { value: "1", label: "About" },
  { value: "2", label: "Skills" },
  { value: "3", label: "Experience" },
  { value: "4", label: "Projects" },
  { value: "5", label: "Education" },
  { value: "6", label: "Certifications" },
  { value: "7", label: "Contact Information" },
  { value: "8", label: "Availability & Hiring" },
];

const SKILLS_OPTIONS: AliGPTOption[] = [
  { value: "1", label: "MERN & Next.js Skills" },
  { value: "2", label: "Frontend & Frameworks" },
  { value: "3", label: "Backend & API Development" },
  { value: "4", label: "Databases" },
  { value: "5", label: "Data, Cloud & DevOps" },
  { value: "6", label: "Supporting Tools & Skills" },
  { value: "7", label: "View All Skills" },
  { value: "8", label: "Back to Main Menu" },
];

const EXPERIENCE_OPTIONS: AliGPTOption[] = [
  { value: "1", label: "Next.js Developer Internship" },
  { value: "2", label: "Cloud Data Engineering Training" },
  { value: "3", label: "View All Experience" },
  { value: "4", label: "Back to Main Menu" },
];

const PROJECT_OPTIONS: AliGPTOption[] = [
  { value: "1", label: "MERN Projects" },
  { value: "2", label: "Next.js Projects" },
  { value: "3", label: "Data Engineering Projects" },
  { value: "4", label: "View All Projects" },
  { value: "5", label: "Back to Main Menu" },
];

const FOLLOW_UP_OPTIONS: AliGPTOption[] = [
  { value: "1", label: "Yes, show the main menu" },
  { value: "2", label: "No, end the conversation" },
];

function formatOptions(options: readonly AliGPTOption[]) {
  return options.map((option) => `${option.value}. ${option.label}`).join("\n");
}

function buildMenu(
  heading: string,
  introduction: string,
  options: readonly AliGPTOption[]
) {
  return [
    heading,
    introduction,
    "",
    formatOptions(options),
    "",
    "Choose an option by clicking a button or entering its number.",
  ].join("\n");
}

export function getAliGPTWelcomeReply(): AliGPTReply {
  return {
    reply: buildMenu(
      "Welcome to AliGPT",
      `Hi, I'm AliGPT, the portfolio assistant for ${profile.name}. What would you like to know about him?`,
      MAIN_OPTIONS
    ),
    nextState: "main",
    options: MAIN_OPTIONS,
  };
}

function getRestartReply(): AliGPTReply {
  return {
    reply: buildMenu(
      "Welcome Back",
      `Hi again. What would you like to know about ${profile.name}?`,
      MAIN_OPTIONS
    ),
    nextState: "main",
    options: MAIN_OPTIONS,
  };
}

function getMainMenuReply(): AliGPTReply {
  return {
    reply: buildMenu(
      "Main Menu",
      "What else would you like to know about Ali?",
      MAIN_OPTIONS
    ),
    nextState: "main",
    options: MAIN_OPTIONS,
  };
}

function getSkillsMenuReply(): AliGPTReply {
  return {
    reply: buildMenu(
      "Skills",
      "Which skill area would you like to view?",
      SKILLS_OPTIONS
    ),
    nextState: "skills",
    options: SKILLS_OPTIONS,
  };
}

function getExperienceMenuReply(): AliGPTReply {
  return {
    reply: buildMenu(
      "Experience",
      "Which experience would you like to view?",
      EXPERIENCE_OPTIONS
    ),
    nextState: "experience",
    options: EXPERIENCE_OPTIONS,
  };
}

function getProjectsMenuReply(): AliGPTReply {
  return {
    reply: buildMenu(
      "Projects",
      "Which project category would you like to view?",
      PROJECT_OPTIONS
    ),
    nextState: "projects",
    options: PROJECT_OPTIONS,
  };
}

function withFollowUp(heading: string, body: string): AliGPTReply {
  return {
    reply: [
      heading,
      body,
      "",
      "Would you like to know anything else about Ali?",
      formatOptions(FOLLOW_UP_OPTIONS),
    ].join("\n"),
    nextState: "follow-up",
    options: FOLLOW_UP_OPTIONS,
  };
}

function invalidOption(
  state: Exclude<AliGPTMenuState, "stopped">
): AliGPTReply {
  const message =
    "Wrong option selected. Please choose one of the available options.";

  if (state === "skills") {
    return {
      ...getSkillsMenuReply(),
      reply: `${message}\n\n${getSkillsMenuReply().reply}`,
    };
  }

  if (state === "experience") {
    return {
      ...getExperienceMenuReply(),
      reply: `${message}\n\n${getExperienceMenuReply().reply}`,
    };
  }

  if (state === "projects") {
    return {
      ...getProjectsMenuReply(),
      reply: `${message}\n\n${getProjectsMenuReply().reply}`,
    };
  }

  if (state === "follow-up") {
    return {
      reply: [
        "Invalid Selection",
        "Please choose 1 for Yes or 2 for No.",
        "",
        formatOptions(FOLLOW_UP_OPTIONS),
      ].join("\n"),
      nextState: "follow-up",
      options: FOLLOW_UP_OPTIONS,
    };
  }

  return {
    ...getMainMenuReply(),
    reply: `${message}\n\n${getMainMenuReply().reply}`,
  };
}

function formatSkillCategory(title: string) {
  const category = skillCategories.find((item) => item.title === title);

  if (!category) {
    return "No skills are listed in this category.";
  }

  return category.skills.map((skill) => `• ${skill}`).join("\n");
}

function formatCoreSkills() {
  const coreSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "RESTful API",
    "Git",
    "GitHub",
  ];

  return coreSkills.map((skill) => `• ${skill}`).join("\n");
}

function formatAllSkills() {
  const categoryText = skillCategories
    .map(
      (category) =>
        `${category.title}\n${category.skills
          .map((skill) => `• ${skill}`)
          .join("\n")}`
    )
    .join("\n\n");

  return `${categoryText}\n\nSupporting Tools & Skills\n${sliderSkills
    .map((skill) => `• ${skill}`)
    .join("\n")}`;
}

function formatExperienceItem(index: number) {
  const item = experience[index];

  if (!item) {
    return "This experience entry is not available.";
  }

  return [
    `${item.role} at ${item.company}`,
    `Duration: ${item.duration}`,
    `Type: ${item.type}`,
    item.description,
    "",
    "Highlights",
    ...item.highlights.map((highlight) => `• ${highlight}`),
  ].join("\n");
}

function formatAllExperience() {
  return experience
    .map((_, index) => formatExperienceItem(index))
    .join("\n\n");
}

type ProjectCategory = "mern" | "nextjs" | "data";

function formatProjects(category?: ProjectCategory) {
  const selectedProjects = category
    ? projects.filter((project) =>
        project.categories.some((item) => item === category)
      )
    : projects;

  if (!selectedProjects.length) {
    return "No projects are currently listed in this category.";
  }

  return selectedProjects
    .map((project, index) => {
      const repositoryUrl = String(project.repoUrl ?? "").trim();
      const repository =
        repositoryUrl && repositoryUrl !== "#"
          ? repositoryUrl
          : "Not publicly listed";

      return [
        `${index + 1}. ${project.title}`,
        project.description,
        `Tech: ${project.tech.join(", ")}`,
        `Repository: ${repository}`,
      ].join("\n");
    })
    .join("\n\n");
}

function formatEducation() {
  return education
    .map((item, index) =>
      [
        `${index + 1}. ${item.institute}`,
        `Program: ${item.degree}`,
        `Duration: ${item.duration}`,
        `Result: ${item.result}`,
        item.description,
      ].join("\n")
    )
    .join("\n\n");
}

function formatCertifications() {
  return certifications
    .map((item, index) =>
      [
        `${index + 1}. ${item.title}`,
        `Institute: ${item.institute}`,
        `Duration: ${item.duration}`,
        `Covered Skills: ${item.skills.join(", ")}`,
      ].join("\n")
    )
    .join("\n\n");
}

function answerMainMenu(choice: string): AliGPTReply {
  switch (choice) {
    case "1":
      return withFollowUp(
        "About Ali",
        [
          profile.summary,
          `Location: ${profile.location}`,
          `Primary Focus: ${profile.title}`,
        ].join("\n")
      );
    case "2":
      return getSkillsMenuReply();
    case "3":
      return getExperienceMenuReply();
    case "4":
      return getProjectsMenuReply();
    case "5":
      return withFollowUp("Education", formatEducation());
    case "6":
      return withFollowUp("Certifications", formatCertifications());
    case "7":
      return withFollowUp(
        "Contact Information",
        [
          `Mobile: ${contact.mobile}`,
          `WhatsApp: ${contact.whatsapp}`,
          `Email: ${contact.email}`,
          `LinkedIn: ${contact.linkedin}`,
          `GitHub: ${contact.github}`,
        ].join("\n")
      );
    case "8":
      return withFollowUp(
        "Availability & Hiring",
        [
          profile.availability,
          "",
          `Work Preference: ${profile.workPreference}`,
          "",
          `Contact: ${contact.email}`,
        ].join("\n")
      );
    default:
      return invalidOption("main");
  }
}

function answerSkillsMenu(choice: string): AliGPTReply {
  switch (choice) {
    case "1":
      return withFollowUp(
        "Core MERN & Next.js Skills",
        formatCoreSkills()
      );
    case "2":
      return withFollowUp(
        "Frontend & Frameworks",
        formatSkillCategory("Frontend & Frameworks")
      );
    case "3":
      return withFollowUp(
        "Backend & API Development",
        formatSkillCategory("Backend & API Development")
      );
    case "4":
      return withFollowUp(
        "Databases",
        formatSkillCategory("Databases")
      );
    case "5":
      return withFollowUp(
        "Data, Cloud & DevOps",
        formatSkillCategory("Data, Cloud & DevOps")
      );
    case "6":
      return withFollowUp(
        "Supporting Tools & Skills",
        sliderSkills.map((skill) => `• ${skill}`).join("\n")
      );
    case "7":
      return withFollowUp("All Skills", formatAllSkills());
    case "8":
      return getMainMenuReply();
    default:
      return invalidOption("skills");
  }
}

function answerExperienceMenu(choice: string): AliGPTReply {
  switch (choice) {
    case "1":
      return withFollowUp(
        "Next.js Developer Internship",
        formatExperienceItem(0)
      );
    case "2":
      return withFollowUp(
        "Cloud Data Engineering Training",
        formatExperienceItem(1)
      );
    case "3":
      return withFollowUp("All Experience", formatAllExperience());
    case "4":
      return getMainMenuReply();
    default:
      return invalidOption("experience");
  }
}

function answerProjectsMenu(choice: string): AliGPTReply {
  switch (choice) {
    case "1":
      return withFollowUp("MERN Projects", formatProjects("mern"));
    case "2":
      return withFollowUp("Next.js Projects", formatProjects("nextjs"));
    case "3":
      return withFollowUp(
        "Data Engineering Projects",
        formatProjects("data")
      );
    case "4":
      return withFollowUp("All Projects", formatProjects());
    case "5":
      return getMainMenuReply();
    default:
      return invalidOption("projects");
  }
}

function answerFollowUp(choice: string): AliGPTReply {
  if (choice === "1" || choice === "yes" || choice === "y") {
    return getMainMenuReply();
  }

  if (choice === "2" || choice === "no" || choice === "n") {
    return {
      reply:
        "Thanks for visiting Ali's portfolio. The conversation is now paused. You can close the chat, or type anything later to start again.",
      nextState: "stopped",
      options: [],
    };
  }

  return invalidOption("follow-up");
}

function normalizeSelection(value: string) {
  return value.trim().toLowerCase();
}

export function buildMenuDrivenAliGPTReply(
  message: string,
  currentState: AliGPTMenuState
): AliGPTReply {
  const choice = normalizeSelection(message);

  if (currentState === "stopped") {
    return getRestartReply();
  }

  if (!choice) {
    return invalidOption(currentState);
  }

  switch (currentState) {
    case "main":
      return answerMainMenu(choice);
    case "skills":
      return answerSkillsMenu(choice);
    case "experience":
      return answerExperienceMenu(choice);
    case "projects":
      return answerProjectsMenu(choice);
    case "follow-up":
      return answerFollowUp(choice);
    default:
      return getAliGPTWelcomeReply();
  }
}

/**
 * Compatibility export for the previous API route.
 * The menu-driven client no longer calls this function.
 */
export function buildLocalAliGPTReply(message: string) {
  return buildMenuDrivenAliGPTReply(message, "main").reply;
}

/**
 * Compatibility export for the optional legacy Groq backup route.
 * AliGPT now uses deterministic menu navigation instead of open-ended prompts.
 */
export function buildAliGPTSystemPrompt() {
  return [
    "AliGPT is a menu-driven portfolio assistant for Muhammad Ali Nawaz.",
    "Do not answer open-ended questions.",
    "Ask the visitor to use the numbered portfolio menu.",
  ].join(" ");
}
