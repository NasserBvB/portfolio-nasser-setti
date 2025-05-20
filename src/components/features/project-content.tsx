"use client";

import { Project } from "@/payload-types";
import RichText, { adaptContentToLeaf } from "../rich-text";

export const ProjectContent: React.FC<{ project: Project }> = ({ project }) => {
    return <div className="prose prose-lg dark:prose-invert max-w-none">
        <RichText content={adaptContentToLeaf(project?.content.root.children)} />
    </div>
};
