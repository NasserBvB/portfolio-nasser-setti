"use client";

import { Experience } from "@/payload-types";
import RichText, { adaptContentToLeaf } from "../rich-text";

export const ExperienceContent: React.FC<{ experience: Experience }> = ({ experience }) => {
    return <div className="prose prose-lg dark:prose-invert max-w-none">
        <RichText content={adaptContentToLeaf(experience?.content.root.children)} />
    </div>
};
