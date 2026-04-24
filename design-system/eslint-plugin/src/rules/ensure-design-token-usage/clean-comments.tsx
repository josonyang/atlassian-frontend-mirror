/**
 * Function that removes JS comments from a string of code,
 * sometimes makers will have single or multiline comments in their tagged template literals styles, this can mess with our parsing logic.
 */
export function cleanComments(str: string): string {
	return str.replace(/\/\*([\s\S]*?)\*\//g, '').replace(/\/\/(.*)/g, '');
}
