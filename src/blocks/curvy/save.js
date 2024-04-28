export default function save(props) {
	const blockProps = useBlockProps.save();
	const { children } = useInnerBlocksProps.save(blockProps);

	return children;
}
