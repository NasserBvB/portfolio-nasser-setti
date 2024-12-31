import { revalidatePath } from "next/cache";
import { CollectionAfterOperationHook, CollectionBeforeValidateHook } from "payload";

export const makeSlug = (title: string): string => {
    return title
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
        .trim() // Remove leading/trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Remove repeated hyphens
};

export const afterOperationHookProjects: CollectionAfterOperationHook = async ({
    args, // arguments passed into the operation
    operation, // name of the operation
    req, // full express request
    result, // the result of the operation, before modifications
}) => {
    switch (operation) {
        case "create":
        case "delete":
        case "deleteByID":
        case "update":
        case "updateByID":
            revalidatePath(`/${args.collection.config.slug}`);
            revalidatePath("/");
            break;

        default:
            break;
    }
    return result; // return modified result as necessary
};

export const beforeValidateBlog: CollectionBeforeValidateHook<any> = async ({
    data, // incoming data to update or create with
    req, // full express request
    operation, // name of the operation ie. 'create', 'update'
    originalDoc, // original document
}) => {
    if (!data?.title) return data;
    data.slug = makeSlug(data.title);
    return data; // Return data to either create or update a document with
};