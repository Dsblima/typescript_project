import fs from "fs";

export const deleteFile = async (filName: string) => {
    try {
        await fs.promises.stat(filName);
    } catch {
        return;
    }
    await fs.promises.unlink(filName);
};
