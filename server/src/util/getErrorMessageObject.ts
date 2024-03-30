function getErrorMessageObject(error: unknown): { error: string } {
    if (error instanceof Error) {
        return { error: error.message };
    } else {
        return { error: 'An unexpected error occurred' };
    }
}
export default getErrorMessageObject;
