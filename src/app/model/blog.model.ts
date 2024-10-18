// blog.model.ts
export interface Comment {
    id: string;
    author: string;
    text: string;
    likes: number;
    dislikes: number;
    createdDate: string; // Adjust the type if you want to use Date
}

export interface Blog {
    id: string;
    title: string;
    banner: string;
    description: string;
    category: string; // Adjust type based on categories (could be a number)
    createdDate: string; // Adjust type if you want to use Date
    author: string;
    isPublished: boolean;
    comments?: Comment[]; // Optional, as some blogs may not have comments
}


