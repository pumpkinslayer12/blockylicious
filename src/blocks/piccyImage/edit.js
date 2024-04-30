
import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import { useSelect } from '@wordpress/data'
import {
	useBlockProps,
	MediaUploadCheck,
	MediaUpload
} from '@wordpress/block-editor';

import './editor.scss';
import { Icon } from '@wordpress/components';
import { ImageThumbnail } from '../../components/imageThumbnail';
import { useImage } from '../../hooks/useImage';

export default function Edit(props) {
	const blockProps = useBlockProps();
	const image = useImage(props.attributes.imageId);

	const imageSelected = !!props.attributes.imageId && !!image?.source_url;
	return (

		<div {...blockProps}>
			{!!imageSelected &&
				<ImageThumbnail imageId={props.attributes.imageId} />
			}
			{!imageSelected &&
				<div className='piccy-image-thumbnail-no-image-selected'>
					<Icon icon="format-image" style={{ margin: "auto" }} />
				</div>}
			<MediaUploadCheck>
				<MediaUpload
					allowedTypes={["image"]}
					render={({ open }) => {
						return (
							<button
								className="piccy-image-media-select"
								onClick={open}>
								{imageSelected ? __("Replace image", metadata.textdomain) : __("Select an image", metadata.textdomain)}
							</button>
						)
					}}
					value={props.attributes.imageId}
					onSelect={(item) => {
						props.setAttributes({
							imageId: item.id,
						});
					}}
				/>
			</MediaUploadCheck>
		</div>

	)

}
