"use client";

import { Blog } from "@/payload-types";
import RichText, { adaptContentToLeaf } from "../rich-text";

export const BlogContent: React.FC<{ blog: Blog }> = ({ blog }) => {
    return <div className="prose prose-lg dark:prose-invert max-w-none">
        <RichText content={adaptContentToLeaf(blog?.content.root.children)} />
    </div>
};
