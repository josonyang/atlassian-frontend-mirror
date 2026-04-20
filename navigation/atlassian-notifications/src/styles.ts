export const iframeCSS = ({ loading }: { loading: boolean }): {
    readonly border: 0;
    readonly display: "none" | "block";
    readonly flex: "1 0 100%";
    readonly height: "inherit";
    readonly width: "100%";
} =>
	({
		border: 0,
		flex: '1 0 100%',
		height: 'inherit',
		display: loading ? 'none' : 'block',
		width: '100%',
	}) as const;
