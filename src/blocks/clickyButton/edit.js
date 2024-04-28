/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
	RichText
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	SelectControl
} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import { useSelect } from '@wordpress/data';
export default function Edit(props) {
	const postTypes = useSelect((select) => {
		{/*Root gives all posts if used as the first argument. Specific posts will use post-type */ }
		const data = select("core").getEntityRecords("root", "postType", {
			per_page: -1
		});
		return data?.filter(item => item.visibility.show_in_nav_menus && item.visibility.show_ui);
	});

	const posts = useSelect((select) => {
		const data = select("core").getEntityRecords(
			"postType",
			props.attributes.postType,
			{ per_page: -1 });
		return data;
	},
		[props.attributes.postType]);
	const blockProps = useBlockProps();
	return (
		<>
			<InspectorControls>
				<PanelBody title='Destination'>

					<SelectControl
						label="Post Type"
						value={props.attributes.postType}
						onChange={(newValue) => {
							props.setAttributes(
								{
									postType: newValue,
								}
							)
						}}
						options={[{
							label: "Select a post type...",
							value: ""
						}, ...(postTypes || []).map(postTypes => (
							{
								label: postTypes.labels.singular_name,
								value: postTypes.slug
							}
						))
						]} />

					{!!props.attributes.postType &&
						<SelectControl
							label={`Linked ${props.attributes.postType}`}
							value={props.attributes.linkedPost}
							onChange={(newValue) => {
								props.setAttributes(
									{
										linkedPost: newValue ? parseInt(newValue) : null,
									}
								)
							}}
							options={[{
								label: `Select a ${props.attributes.postType} to link to`,
								value: ""
							}, ...(posts || []).map(post => (
								{
									label: post.title.rendered,
									value: post.id,
								}
							))
							]} />
					}
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>

				{/*multiline false, empty onSplit and empty onReplace prevent newlines in button text */}
				<RichText
					placeholder='Label Text'
					value={props.attributes.labelText}
					allowedFormats={[]}
					multiline={false}
					onChange={(newValue) => {
						props.setAttributes({
							labelText: newValue,
						})
					}}
					onSplit={() => { }}
					onReplace={() => { }}
				/>
			</div>
		</>
	)
}
