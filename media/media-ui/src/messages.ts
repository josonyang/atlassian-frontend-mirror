import { defineMessages, type MessageDescriptor } from 'react-intl-next';

export type RequestAccessMessageKey =
	| 'request_access_description'
	| 'click_to_join_description'
	| 'request_access_pending_description'
	| 'click_to_join'
	| 'request_access'
	| 'request_access_pending'
	| 'forbidden_description'
	| 'request_denied_description';

export type MessageKey =
	| 'retry'
	| 'failed_to_load'
	| 'failed_to_upload'
	| 'recent_uploads'
	| 'upload_file'
	| 'drag_and_drop_your_files'
	| 'drag_and_drop_your_files_and_folders'
	| 'drop_your_files'
	| 'upload'
	| 'cancel'
	| 'delete'
	| 'success'
	| 'error'
	| 'search_all_gifs'
	| 'cant_retrieve_gifs'
	| 'cant_retrieve_files'
	| 'check_your_network'
	| 'try_again'
	| 'try_another_account'
	| 'no_gifs_found'
	| 'no_gifs_found_suggestion'
	| 'load_more_gifs'
	| 'add_account'
	| 'unlink_account'
	| 'upload_file_from'
	| 'connect_to'
	| 'connect_account_description'
	| 'connect_link_account'
	| 'connect_link_account_card'
	| 'connect_link_account_card_name'
	| 'connect_link_account_card_description'
	| 'invalid_permissions'
	| 'invalid_permissions_description'
	| 'select_an_avatar'
	| 'upload_an_avatar'
	| 'or_select_default_avatars'
	| 'select_an_avatar_from_all_defaults'
	| 'show_more_avatars_btn_label'
	| 'loading'
	| 'loading_file'
	| 'save'
	| 'or'
	| 'upload_photo'
	| 'default_avatars'
	| 'avatar_picker_back_btn_label'
	| 'drag_and_drop_images_here'
	| 'alt_text'
	| 'alt_text_description'
	| 'image_url_invalid_error'
	| 'image_format_invalid_error'
	| 'image_size_too_large_error'
	| 'something_went_wrong'
	| 'might_be_a_hiccup'
	| 'couldnt_generate_preview'
	| 'couldnt_generate_encrypted_entry_preview'
	| 'cant_preview_file_type'
	| 'item_not_found_in_list'
	| 'not_found_title'
	| 'not_found_description'
	| 'no_pdf_artifacts'
	| 'password_protected_pdf'
	| 'password'
	| 'enter_password'
	| 'incorrect_password'
	| 'submit'
	| 'give_feedback'
	| 'try_downloading_file'
	| 'webgl_warning_description'
	| 'unable_to_annotate_image'
	| 'learn_more'
	| 'accounts'
	| 'actions'
	| 'error_hint_retry'
	| 'error_hint_critical'
	| 'close'
	| 'could_not_load_editor'
	| 'could_not_save_image'
	| 'could_not_load_link'
	| 'annotate'
	| 'annotate_tool_arrow'
	| 'annotate_tool_text'
	| 'annotate_tool_shape'
	| 'annotate_tool_brush'
	| 'annotate_tool_blur'
	| 'annotate_tool_line_thickness'
	| 'annotate_tool_color'
	| 'annotate_confirmation_close_anyway'
	| 'annotate_confirmation_heading'
	| 'annotate_confirmation_content'
	| 'drop_your_files_here'
	| 'share_files_instantly'
	| 'insert_files'
	| 'zoom_out'
	| 'zoom_in'
	| 'remove_image'
	| 'play'
	| 'pause'
	| 'disable_fullscreen'
	| 'enable_fullscreen'
	| 'error_loading_file'
	| 'error_generating_preview'
	| 'download'
	| 'download_disabled_security_policy'
	| 'unknown'
	| 'document'
	| 'audio'
	| 'video'
	| 'image'
	| 'archive'
	| 'email'
	| 'text'
	| 'displayThumbnail'
	| 'search'
	| 'view'
	| 'viewIn'
	| 'viewOriginal'
	| 'changeView'
	| 'playbackSpeed'
	| 'skipBackward'
	| 'skipForward'
	| 'sizeOptions'
	| 'fileDisplayOptions'
	| 'volumeMuteButtonAria'
	| 'volumeLevelControlAria'
	| 'playbackDefaultSpeed'
	| 'preview'
	| 'preview_unavailable'
	| 'creating_preview'
	| 'couldnt_load_file'
	| 'error_429'
	| 'close_and_reopen'
	| 'viewer_rateLimited'
	| 'zip_entry_load_fail'
	| 'file_image_is_selected'
	| 'file_video_is_selected'
	| 'file_audio_is_selected'
	| 'file_doc_is_selected'
	| 'file_archive_is_selected'
	| 'file_unknown_is_selected'
	| 'open_file_in_viewer'
	| 'video_seeker_assistive_text_time_value'
	| 'video_seeker_label_assistive_text'
	| 'abuse_modal_body'
	| 'abuse_modal_title'
	| 'abuse_modal_submit'
	| 'image_cropper_arrow_keys_label'
	| 'image_cropper_image_moved'
	| 'image_cropper_zoom_out'
	| 'image_cropper_zoom_in'
	| 'image_cropper_zoom_slider'
	| 'video_captions_enable'
	| 'video_captions_select_captions'
	| 'video_captions_upload_captions_form_header'
	| 'video_captions_upload_captions_form_language_picker'
	| 'video_captions_upload_success_description'
	| 'video_captions_upload_error_description'
	| 'video_captions_delete_captions_confirmation_header'
	| 'video_captions_delete_captions_confirmation_description'
	| 'video_captions_delete_success_description'
	| 'video_captions_delete_error_description'
	| 'manage_captions'
	| 'add_captions'
	| RequestAccessMessageKey;

type Messages = {
	[K in MessageKey]: MessageDescriptor;
};

export const messages: Messages = defineMessages({
	click_to_join: {
		id: 'fabric.media.click_to_join',
		defaultMessage: 'Join {context}',
		description: 'Allows the user join the product or service immediately',
	},
	click_to_join_description: {
		id: 'fabric.media.click_to_join_description',
		defaultMessage: "You've been approved, so you can join {context} right away.",
		description:
			'Informs the user that they have access to this product, and can sign up or join right away.',
	},
	request_access: {
		id: 'fabric.media.request_access',
		defaultMessage: 'Request access',
		description: 'Allows the user to request access to a product or service',
	},
	request_access_description: {
		id: 'fabric.media.request_access_description',
		defaultMessage: 'Request access to {context} view this preview.',
		description: 'Allows the user to request access to a product',
	},
	request_access_pending: {
		id: 'fabric.media.request_access_pending',
		defaultMessage: 'Access pending',
		description: 'Allows the user to try an action again with their current account',
	},
	request_access_pending_description: {
		id: 'fabric.media.request_access_pending_description',
		defaultMessage: 'Your access request is pending.',
		description: 'Informs the user that their request to view this content is pending',
	},
	forbidden_description: {
		id: 'fabric.media.forbidden_description',
		defaultMessage:
			'You don’t have access to this preview. Contact the site admin if you need access.',
		description: 'Informs the user that they cannot view this content.',
	},
	request_denied_description: {
		id: 'fabric.media.request_denied_description',
		defaultMessage:
			'Your access request was denied. Contact the site admin if you still need access.',
		description: 'Informs the user that their request to view this content was denied',
	},
	retry: {
		id: 'fabric.media.retry',
		defaultMessage: 'Retry',
		description: 'Allows user to perform an action again',
	},
	failed_to_load: {
		id: 'fabric.media.failed_to_load',
		defaultMessage: 'Failed to load',
		description: 'We show this message when we have an error loading a file',
	},
	failed_to_upload: {
		id: 'fabric.media.failed_to_upload',
		defaultMessage: 'Failed to upload',
		description: 'We show this message when we have an error uploading a file',
	},
	recent_uploads: {
		id: 'fabric.media.recent_uploads',
		defaultMessage: 'Recent uploads',
		description: 'Title of a section where we show the user recent uploaded files',
	},
	upload_file: {
		id: 'fabric.media.upload_file',
		defaultMessage: 'Upload a file',
		description: 'Call to action that initiates the upload of a file',
	},
	drag_and_drop_your_files: {
		id: 'fabric.media.drag_and_drop_your_files',
		defaultMessage: 'Drag and drop your files anywhere or',
		description: 'Used to describe the area where the user can drag and drop files to upload',
	},
	drag_and_drop_your_files_and_folders: {
		id: 'fabric.media.drag_and_drop_your_files_and_folders',
		defaultMessage: 'Drag and drop your files and folders anywhere or',
		description:
			'Used to describe the area where the user can drag and drop files AND folders to upload',
	},
	drop_your_files: {
		id: 'fabric.media.drop_your_files',
		defaultMessage: 'Drop your files to upload',
		description:
			'Indicates that the files will be uploaded when the user drops them in the drag and drop area',
	},
	upload: {
		id: 'fabric.media.upload',
		defaultMessage: 'Upload',
		description: 'upload',
	},
	cancel: {
		id: 'fabric.media.cancel',
		defaultMessage: 'Cancel',
		description: 'cancel',
	},
	delete: {
		id: 'fabric.media.delete',
		defaultMessage: 'Delete',
		description: 'delete',
	},
	success: {
		id: 'fabric.media.success',
		defaultMessage: 'Success',
		description: 'success',
	},
	error: {
		id: 'fabric.media.error',
		defaultMessage: 'Error',
		description: 'error',
	},
	search_all_gifs: {
		id: 'fabric.media.search_all_gifs',
		defaultMessage: 'Search all the GIFs!',
		description:
			'Used as input placeholder to let the user know that they can search for GIF image files',
	},
	cant_retrieve_gifs: {
		id: 'fabric.media.cant_retrieve_gifs',
		defaultMessage: 'Ouch! We could not retrieve any GIFs',
		description: 'Error message when we can not find any GIF images for that text',
	},
	cant_retrieve_files: {
		id: 'fabric.media.cant_retrieve_files',
		defaultMessage: 'Ouch! We could not retrieve any files',
		description: 'Error message when we can not find any files in dropbox/google drive',
	},
	check_your_network: {
		id: 'fabric.media.check_your_network',
		defaultMessage: 'Check your network connection',
		description: 'Error message when network does not work',
	},
	try_again: {
		id: 'fabric.media.try_again',
		defaultMessage: 'Try again',
		description: 'Allow the user to try an action again',
	},
	try_another_account: {
		id: 'fabric.media.try_another_account',
		defaultMessage: 'Try another account',
		description: 'Allows the user to try an action again with a different account',
	},
	no_gifs_found: {
		id: 'fabric.media.no_gifs_found',
		defaultMessage: "Hello? Was it me you're looking for?",
		description: 'Not expected error that happens when searching for GIF images',
	},
	no_gifs_found_suggestion: {
		id: 'fabric.media.no_gifs_found_suggestion',
		defaultMessage: 'We couldn\'t find anything for "{query}"',
		description: 'There are no results for GIFs matching that query',
	},
	load_more_gifs: {
		id: 'fabric.media.load_more_gifs',
		defaultMessage: 'Load more GIFs',
		description: 'Used to load next page of GIF images',
	},
	add_account: {
		id: 'fabric.media.add_account',
		defaultMessage: 'Add account',
		description: 'Allows to add a new account',
	},
	unlink_account: {
		id: 'fabric.media.unlink_account',
		defaultMessage: 'Unlink Account',
		description: 'Allows to remove a connected account from the user',
	},
	upload_file_from: {
		id: 'fabric.media.upload_file_from',
		defaultMessage: 'Upload a file from {name}',
		description: 'Allows to upload a file from different sources',
	},
	connect_to: {
		id: 'fabric.media.connect_to',
		defaultMessage: 'Connect to {name}',
		description: 'Allows the user to connect with different types of external services',
	},
	connect_account_description: {
		id: 'fabric.media.connect_account_description',
		defaultMessage: "We'll open a new page to help you connect your {name} account",
		description: 'Explains what will happen when the users connects to a new account',
	},
	connect_link_account: {
		id: 'fabric.media.connect_link_account',
		defaultMessage: 'Connect to preview',
		description:
			'Shown when a user does not have access to a link, but can connect their external account to view the link.',
	},
	connect_link_account_card: {
		id: 'fabric.media.connect_link_account_card_view',
		defaultMessage: 'Connect',
		description:
			'Shown when a user does not have access to a link, but can connect their external account to view the link on card view.',
	},
	connect_link_account_card_name: {
		id: 'fabric.media.connect_link_account_card_view_name',
		defaultMessage: 'Connect your {context} account',
		description:
			'Shown when a user does not have access to a link, but can connect their external account to view the link on card view. Displayed in title.',
	},
	connect_link_account_card_description: {
		id: 'fabric.media.connect_link_account_card_view_description',
		defaultMessage: 'To show a preview of this link, connect your {context} account.',
		description:
			'Shown when a user does not have access to a link, but can connect their external account to view the link on card view. Displayed in byline.',
	},
	invalid_permissions: {
		id: 'fabric.media.invalid_permissions',
		defaultMessage: 'Restricted link',
		description: 'Message shown when a user does not have permissions to view an item',
	},
	invalid_permissions_description: {
		id: 'fabric.media.invalid_permissions_description',
		defaultMessage:
			"You'll need to request access or try a different account to view this preview.",
		description:
			'Message shown when a user does not have permissions to view an item. Displayed as description.',
	},
	select_an_avatar: {
		id: 'fabric.media.select_an_avatar',
		defaultMessage: 'Select a default avatar',
		description: 'Shown when the user selects an avatar from a list of avatars',
	},
	upload_an_avatar: {
		id: 'fabric.media.upload_an_avatar',
		defaultMessage: 'Upload an avatar',
		description: 'Indicates that the user can upload a new avatar',
	},
	select_an_avatar_from_all_defaults: {
		id: 'fabric.media.select_an_avatar_from_all_defaults',
		defaultMessage: 'Select from all default options',
		description:
			'Announced when user is required to select an avatar from the complete list of default options',
	},
	show_more_avatars_btn_label: {
		id: 'fabric.media.show_more_avatars_btn_label',
		defaultMessage: 'Show more',
		description: 'Button label to show more default avatar options',
	},
	or_select_default_avatars: {
		id: 'fabric.media.or_select_default_avatars',
		defaultMessage: 'Upload a photo or select from some default options',
		description:
			'Announced when a user is required to select an avatar by uploading an avatar or selecting from default options',
	},
	loading: {
		id: 'fabric.media.loading',
		defaultMessage: 'Loading...',
		description: 'Indicates an element on a page is loading.',
	},
	loading_file: {
		id: 'fabric.media.loading_file',
		defaultMessage: 'Loading file...',
		description: 'Shown when a file is being fetched',
	},
	save: {
		id: 'fabric.media.save',
		defaultMessage: 'Save',
		description: 'Just the "save" word',
	},
	or: {
		id: 'fabric.media.or',
		defaultMessage: 'or',
		description: 'Just the "or" word',
	},
	upload_photo: {
		id: 'fabric.media.upload_photo',
		defaultMessage: 'Upload a photo',
		description: 'Call to action for the user to upload a new photo',
	},
	default_avatars: {
		id: 'fabric.media.default_avatars',
		defaultMessage: 'Default avatars',
		description: 'Showed above the default avatar list',
	},
	avatar_picker_back_btn_label: {
		id: 'fabric.media.avatar_picker_back_btn_label',
		defaultMessage: 'Go Back',
		description: 'Button text to navigate back to the previous screen',
	},
	drag_and_drop_images_here: {
		id: 'fabric.media.drag_and_drop_images_here',
		defaultMessage: 'Drag and drop your images here',
		description: 'Indicates that the user can drag and drop images in that area',
	},
	alt_text: {
		id: 'fabric.media.alt_text_label',
		defaultMessage: 'Alt text',
		description: 'Shown above the alt text field',
	},
	alt_text_description: {
		id: 'fabric.media.alt_text_helper_message',
		defaultMessage: 'How would you describe the selected image to someone with low vision?',
		description: 'Shown below the alt text field',
	},
	image_url_invalid_error: {
		id: 'fabric.media.image_url_invalid_error',
		defaultMessage: 'Could not load image, the url is invalid.',
		description: 'There was an error parsing the image url',
	},
	image_format_invalid_error: {
		id: 'fabric.media.image_format_invalid_error',
		defaultMessage: 'Could not load image, the format is invalid.',
		description: 'The provided image format is not valid',
	},
	image_size_too_large_error: {
		id: 'fabric.media.image_size_too_large_error',
		defaultMessage: 'Image is too large, must be no larger than {MAX_SIZE_MB}Mb',
		description: 'The provided image size is too big',
	},
	something_went_wrong: {
		id: 'fabric.media.something_went_wrong',
		defaultMessage: 'Something went wrong.',
		description: 'Showed when an error happen but we dont have more info about it',
	},
	might_be_a_hiccup: {
		id: 'fabric.media.might_be_a_hiccup',
		defaultMessage: 'It might just be a hiccup.',
		description:
			'Used when an unknow error happens, just in a funny way of saying that we dont have more info about it',
	},
	couldnt_generate_preview: {
		id: 'fabric.media.couldnt_generate_preview',
		defaultMessage: "We couldn't generate a preview for this file.",
		description: 'Error case for when the backend cant generate a preview for that file',
	},
	couldnt_generate_encrypted_entry_preview: {
		id: 'fabric.media.couldnt_generate_encrypted_entry_preview',
		defaultMessage: "We can't preview encrypted or password protected files.",
		description: 'Error case for when an entry selected is encrypted',
	},
	cant_preview_file_type: {
		id: 'fabric.media.cant_preview_file_type',
		defaultMessage: "We can't preview this file type.",
		description: 'Error case for when we have no available preview for that file',
	},
	item_not_found_in_list: {
		id: 'fabric.media.item_not_found_in_list',
		defaultMessage: 'The selected item was not found on the list.',
		description: 'Error case for when a provided item is not found within the list of items',
	},
	not_found_title: {
		id: 'fabric.media.not_found_title',
		defaultMessage: "Uh oh. We can't find this link!",
		description: 'Error case for when a provided link is not found',
	},
	not_found_description: {
		id: 'fabric.media.not_found_description',
		defaultMessage: "We couldn't find the link. Check the url and try editing or paste again.",
		description: 'Error case for when a provided item is not found within the list of items',
	},
	no_pdf_artifacts: {
		id: 'fabric.media.no_pdf_artifacts',
		defaultMessage: 'No PDF artifacts found for this file.',
		description: 'Error case for when we cant preview a PDF file',
	},
	password_protected_pdf: {
		id: 'fabric.media.password_protected_pdf',
		defaultMessage: 'This file is password protected.',
		description: 'Describing that a PDF cannot be viewed because it is protected by password',
	},
	password: {
		id: 'fabric.media.password',
		defaultMessage: 'Password',
		description: 'Description of Password text field.',
	},
	enter_password: {
		id: 'fabric.media.enter_password',
		defaultMessage: 'Enter password',
		description: 'Prompting user to enter the password.',
	},
	incorrect_password: {
		id: 'fabric.media.incorrect_password',
		defaultMessage: 'Incorrect password. Please try again.',
		description: 'Error case for when a wrong password is inputted.',
	},
	submit: {
		id: 'fabric.media.submit',
		defaultMessage: 'Submit',
		description: 'Description for a button to submit the form.',
	},
	give_feedback: {
		id: 'fabric.media.give_feedback',
		defaultMessage: 'Give feedback',
		description: 'Call to action that opens a popup to get feedback from the users',
	},
	try_downloading_file: {
		id: 'fabric.media.try_downloading_file',
		defaultMessage: 'Try downloading the file to view it.',
		description: 'We show this message to allow users to download a file',
	},
	webgl_warning_description: {
		id: 'fabric.media.webgl_warning_description',
		defaultMessage:
			'Your browser does not support WebGL. Use a WebGL enabled browser to annotate images.',
		description: 'We show this error message when the browser doesnt support this feature',
	},
	unable_to_annotate_image: {
		id: 'fabric.media.unable_to_annotate_image',
		defaultMessage: "You're unable to annotate this image",
		description: 'If there is an error trying to annotate an image we show this',
	},
	learn_more: {
		id: 'fabric.media.learn_more',
		defaultMessage: 'Learn More',
		description: '',
	},
	accounts: {
		id: 'fabric.media.accounts',
		defaultMessage: 'Accounts',
		description: '',
	},
	actions: {
		id: 'fabric.media.actions',
		defaultMessage: 'Actions',
		description: '',
	},
	error_hint_retry: {
		id: 'fabric.media.error_hint_retry',
		defaultMessage: "Try again and we'll give it another shot.",
		description: 'Generic message that we show if an action failed',
	},
	error_hint_critical: {
		id: 'fabric.media.error_hint_critical',
		defaultMessage: 'If the problem keeps happening contact support.',
		description: 'We show this error message if we cant recover from the action',
	},
	close: {
		id: 'fabric.media.close',
		defaultMessage: 'Close',
		description: '',
	},
	could_not_load_editor: {
		id: 'fabric.media.could_not_load_editor',
		defaultMessage: 'Ouch! We could not load the editor',
		description: 'Error message to communicate that we cant load the editor',
	},
	could_not_save_image: {
		id: 'fabric.media.could_not_save_image',
		defaultMessage: 'Ouch! We could not save the image',
		description: 'Error message to communicate that we cant save an image',
	},
	could_not_load_link: {
		id: 'fabric.media.couldnt_load_link',
		defaultMessage: "We couldn't load this link for an unknown reason.",
		description: 'Error case for card view - link could not be loaded.',
	},
	annotate: {
		id: 'fabric.media.annotate',
		defaultMessage: 'Annotate',
		description: '',
	},
	annotate_tool_arrow: {
		id: 'fabric.media.annotate.tool.arrow',
		defaultMessage: 'Arrow',
		description: '',
	},
	annotate_tool_text: {
		id: 'fabric.media.annotate.tool.text',
		defaultMessage: 'Text',
		description: '',
	},
	annotate_tool_shape: {
		id: 'fabric.media.annotate.tool.shape',
		defaultMessage: 'Shape',
		description: '',
	},
	annotate_tool_brush: {
		id: 'fabric.media.annotate.tool.brush',
		defaultMessage: 'Brush',
		description: '',
	},
	annotate_tool_blur: {
		id: 'fabric.media.annotate.tool.blur',
		defaultMessage: 'Blur',
		description: '',
	},
	annotate_tool_line_thickness: {
		id: 'fabric.media.annotate.tool.line.thickness',
		defaultMessage: 'Line thickness',
		description: '',
	},
	annotate_tool_color: {
		id: 'fabric.media.annotate.tool.color',
		defaultMessage: 'Color',
		description: '',
	},
	annotate_confirmation_close_anyway: {
		id: 'fabric.media.annotate.confirmation.close.anyway',
		defaultMessage: 'Close anyway',
		description: '',
	},
	annotate_confirmation_heading: {
		id: 'fabric.media.annotate.confirmation.heading',
		defaultMessage: 'Unsaved changes',
		description: '',
	},
	annotate_confirmation_content: {
		id: 'fabric.media.annotate.confirmation.content',
		defaultMessage: 'You have some unsaved changes. Are you sure you want to leave?',
		description: '',
	},
	drop_your_files_here: {
		id: 'fabric.media.drop_your_files_here',
		defaultMessage: 'Drop your files here',
		description: 'Info message that we show to indicate that the user can drag and drop files',
	},
	share_files_instantly: {
		id: 'fabric.media.share_files_instantly',
		defaultMessage: "We'll share them instantly",
		description: 'It means that we will upload the files you drag and drop automatically',
	},
	insert_files: {
		id: 'fabric.media.insert_files',
		defaultMessage: 'Insert {0, plural, one {a file} other {{0} files}}',
		description: 'Showed when the user selects 1 or more files to insert',
	},
	zoom_out: {
		id: 'fabric.media.zoom_out',
		defaultMessage: 'zoom out',
		description: 'Indicates the user can zoom out a file',
	},
	zoom_in: {
		id: 'fabric.media.zoom_in',
		defaultMessage: 'zoom in',
		description: 'Indicates the user can zoom in a file',
	},
	remove_image: {
		id: 'fabric.media.remove_image',
		defaultMessage: 'Remove image',
		description: 'Allows the user to remove a file',
	},
	play: {
		id: 'fabric.media.play',
		defaultMessage: 'Play',
		description: '',
	},
	pause: {
		id: 'fabric.media.pause',
		defaultMessage: 'Pause',
		description: '',
	},
	disable_fullscreen: {
		id: 'fabric.media.disable_fullscreen',
		defaultMessage: 'disable fullscreen',
		description: 'Hint to let the user know they can disable the fullscreen mode',
	},
	enable_fullscreen: {
		id: 'fabric.media.enable_fullscreen',
		defaultMessage: 'enable fullscreen',
		description: 'Hint to let the user know they can enable the fullscreen mode',
	},
	error_loading_file: {
		id: 'fabric.media.error_loading_file',
		defaultMessage: 'Error loading file',
		description: 'Message showed when we had an error trying to load the file',
	},
	error_generating_preview: {
		id: 'fabric.media.error_generating_preview',
		defaultMessage: 'Error generating preview',
		description: 'Message showed when we had an error trying generate a preview for a file',
	},
	download: {
		id: 'fabric.media.download',
		defaultMessage: 'Download',
		description: '',
	},
	download_disabled_security_policy: {
		id: 'fabric.media.download_disabled_security_policy',
		defaultMessage: "Download is blocked by your organization's security policy.",
		description: '',
	},
	unknown: {
		id: 'fabric.media.unknown',
		defaultMessage: 'unknown',
		description: '',
	},
	document: {
		id: 'fabric.media.document',
		defaultMessage: 'document',
		description: '',
	},
	audio: {
		id: 'fabric.media.audio',
		defaultMessage: 'audio',
		description: '',
	},
	video: {
		id: 'fabric.media.video',
		defaultMessage: 'video',
		description: '',
	},
	image: {
		id: 'fabric.media.image',
		defaultMessage: 'image',
		description: '',
	},
	archive: {
		id: 'fabric.media.archive',
		defaultMessage: 'archive',
		description: '',
	},
	email: {
		id: 'fabric.media.email',
		defaultMessage: 'email',
		description: '',
	},
	text: {
		id: 'fabric.media.text',
		defaultMessage: 'text',
		description: '',
	},
	displayThumbnail: {
		id: 'fabric.media.display_thumbnail',
		defaultMessage: 'Display thumbnail',
		description: 'Display file with as a thumbnail.',
	},
	search: {
		id: 'fabric.media.search',
		defaultMessage: 'search',
		description: '',
	},
	view: {
		id: 'fabric.media.view',
		defaultMessage: 'View',
		description: 'Go through to a piece of content to view it in its original context.',
	},
	viewIn: {
		id: 'fabric.media.srclink',
		defaultMessage: 'View in',
		description:
			'We have a link in our preview modals to the original document. This text goes before the provider name',
	},
	viewOriginal: {
		id: 'fabric.media.srclinkunknown',
		defaultMessage: 'View Original',
		description:
			"We have a link in our preview modals to the original document. This is for when we don't know the provider name",
	},
	changeView: {
		id: 'fabric.media.change_view',
		defaultMessage: 'Change view',
		description:
			'In the context of a file, it allows the user to select a different way of displaying the file either as inline or a card',
	},
	playbackSpeed: {
		id: 'fabric.media.playback_speed',
		defaultMessage: 'Playback speed',
		description:
			'In the context of a video player, it allows user to switch the speed of the video',
	},
	video_captions_enable: {
		id: 'fabric.media.video_captions_enable',
		defaultMessage: 'Closed Captions',
		description: 'In the context of a video player, it allows user to switch on/off captions',
	},
	video_captions_select_captions: {
		id: 'fabric.media.video_captions_select_captions',
		defaultMessage: 'Select Captions',
		description: 'In the context of a video player, it allows user to select captions',
	},
	video_captions_upload_captions_form_header: {
		id: 'fabric.media.video_captions_upload_captions_form_header',
		defaultMessage: 'Upload Captions',
		description: 'In the context of a video player, it allows user to upload captions',
	},
	video_captions_upload_captions_form_language_picker: {
		id: 'fabric.media.video_captions_upload_captions_form_language_picker',
		defaultMessage: 'Select the file language',
		description:
			'In the context of a video player, it allows user to select the language of the uploading captions',
	},
	video_captions_upload_success_description: {
		id: 'fabric.media.video_captions_upload_success_description',
		defaultMessage: 'The caption was successfully uploaded for this video.',
		description:
			'In the context of a video player, it provides feedback when a caption was successfully uploadd',
	},
	video_captions_upload_error_description: {
		id: 'fabric.media.video_captions_upload_error_description',
		defaultMessage: 'The caption failed to upload.',
		description:
			'In the context of a video player, it provides feedback when a caption failed to upload',
	},
	video_captions_delete_captions_confirmation_header: {
		id: 'fabric.media.video_captions_delete_captions_confirmation_header',
		defaultMessage: 'Delete Caption',
		description:
			'In the context of a video player, it provides a confirmation header before deleting captions',
	},
	video_captions_delete_captions_confirmation_description: {
		id: 'fabric.media.video_captions_delete_captions_confirmation_description',
		defaultMessage: 'Please confirm that you want to delete this caption.',
		description:
			'In the context of a video player, it provides a confirmation description before deleting captions',
	},
	video_captions_delete_success_description: {
		id: 'fabric.media.video_captions_delete_success_description',
		defaultMessage: 'The caption was successfully removed from this video.',
		description:
			'In the context of a video player, it provides feedback when a caption was successfully deleted',
	},
	video_captions_delete_error_description: {
		id: 'fabric.media.video_captions_delete_error_description',
		defaultMessage: 'The caption failed to delete.',
		description:
			'In the context of a video player, it provides feedback when a caption failed to delete',
	},
	manage_captions: {
		id: 'fabric.media.manage_captions',
		defaultMessage: 'Manage Captions',
		description: 'In the context of a video player, it allows user to manage captions',
	},
	add_captions: {
		id: 'fabric.media.add_captions',
		defaultMessage: 'Add Captions',
		description: 'In the context of a video player, it allows user to add captions',
	},
	skipBackward: {
		id: 'fabric.media.skip_backward',
		defaultMessage: 'Back 10 seconds',
		description:
			'In the context of a video player, it allows user to skip 10 seconds of play time backward.',
	},
	skipForward: {
		id: 'fabric.media.skip_forward',
		defaultMessage: 'Forward 10 seconds',
		description:
			'In the context of a video player, it allows user to skip 10 seconds of play time forward.',
	},
	sizeOptions: {
		id: 'fabric.media.size_options',
		defaultMessage: 'Size options',
		description:
			'A dropdown with buttons that allow to convert an image to an inline or to an image or original size',
	},
	fileDisplayOptions: {
		id: 'fabric.media.file.display_options',
		defaultMessage: 'Display options',
		description:
			'A dropdown with buttons that allow to convert between an inline file or a thumbnail file',
	},
	volumeLevelControlAria: {
		id: 'fabric.media.volume_level',
		defaultMessage: 'volume',
		description:
			'In the context of a video player and screen reader. Aria label for volume level control',
	},
	volumeMuteButtonAria: {
		id: 'fabric.media.volume_level',
		defaultMessage: 'mute',
		description: 'In the context of a video player and screen reader. Aria label for mute button',
	},
	playbackDefaultSpeed: {
		id: 'fabric.media.playback_default_speed',
		defaultMessage: 'Default',
		description: 'In the context of a video player, it is a value of a default playback speed',
	},
	preview: {
		id: 'fabric.media.preview',
		defaultMessage: 'Preview',
		description: 'Click to view a richer view of your content, without needing to navigate to it.',
	},
	creating_preview: {
		id: 'fabric.media.creating_preview',
		defaultMessage: 'Creating preview...',
		description: 'Preview is being created for a media card',
	},
	preview_unavailable: {
		id: 'fabric.media.preview_unavailable',
		defaultMessage: 'Preview unavailable',
		description: 'Preview is unavailable for a media card',
	},
	couldnt_load_file: {
		id: 'fabric.media.couldnt_load_file',
		defaultMessage: "We couldn't load the file.",
		description: 'File is rate limited without metadata',
	},
	error_429: {
		id: 'fabric.media.error_429',
		defaultMessage: 'Error 429',
		description: 'Error 429 is thrown',
	},
	close_and_reopen: {
		id: 'fabric.media.close_and_reopen',
		defaultMessage: 'Try closing this file and reopening.',
		description: 'The preview is rate limited',
	},
	viewer_rateLimited: {
		id: 'fabric.media.viewer_rateLimited',
		defaultMessage: `We're having difficulties loading your file.`,
		description: 'Mediaviewer has been rate limited',
	},
	zip_entry_load_fail: {
		id: 'fabric.media.zip_entry_load_failed',
		defaultMessage: `We couldn't load that zip file item to preview`,
		description: 'Zip entry failed to load',
	},
	file_image_is_selected: {
		id: 'fabric.media.file_is_selected',
		defaultMessage: 'Image {name} is selected',
		description: '{name} it is the parameter, which saying alt text or file name of uploaded image',
	},
	file_video_is_selected: {
		id: 'fabric.media.file_is_selected',
		defaultMessage: 'Video {name} is selected',
		description: '{name} it is the parameter, which saying alt text or file name of uploaded video',
	},
	file_audio_is_selected: {
		id: 'fabric.media.file_is_selected',
		defaultMessage: 'Audio {name} is selected',
		description: '{name} it is the parameter, which saying alt text or file name of uploaded audio',
	},
	file_doc_is_selected: {
		id: 'fabric.media.file_is_selected',
		defaultMessage: 'Document {name} is selected',
		description:
			'{name} it is the parameter, which saying alt text or file name of uploaded document',
	},
	file_archive_is_selected: {
		id: 'fabric.media.file_is_selected',
		defaultMessage: 'Archive {name} is selected',
		description:
			'{name} it is the parameter, which saying alt text or file name of uploaded archive',
	},
	file_unknown_is_selected: {
		id: 'fabric.media.file_is_selected',
		defaultMessage: 'File {name} is selected',
		description: '{name} it is the parameter, which saying alt text or file name of uploaded file',
	},
	open_file_in_viewer: {
		id: 'fabric.media.open_file_in_viewer',
		defaultMessage: 'Open {name}',
		description:
			'Shown when user focuses on preview to open the full screen viewer of the file with {name}',
	},
	video_seeker_assistive_text_time_value: {
		id: 'fabric.media.video_seeker_assistive_text_time_value',
		defaultMessage:
			'{currentTimeHours} {currentTimeMinutes} {currentTimeSeconds} of {videoTotalHours} {videoTotalMinutes} {videoTotalSeconds}',
		description:
			'Video time seeker information for screen reader users - final format example: 1 hour 12 minutes 13 seconds of 1 hours 16 minutes 1 second. Units are already translated via Intl.NumberFormat',
	},
	video_seeker_label_assistive_text: {
		id: 'fabric.media.video_seeker_label_assistive_text',
		defaultMessage: 'Seek slider',
		description: 'Video time seek slider aria-label',
	},
	abuse_modal_body: {
		id: 'fabric.media.abuse_modal_body',
		defaultMessage:
			'For your security, our system automatically scans all uploaded files. The file you are about to download potentially contains malicious content',
		description: 'Abuse Modal Body Message',
	},
	abuse_modal_title: {
		id: 'fabric.media.abuse_modal_title',
		defaultMessage: 'Warning',
		description: 'Abuse Modal Title',
	},
	abuse_modal_submit: {
		id: 'fabric.media.abuse_modal_submit',
		defaultMessage: 'Proceed with download',
		description: 'Abuse Modal Submit button caption',
	},
	image_cropper_arrow_keys_label: {
		id: 'media.media-avatar-picker.image-cropper.arrow-keys.label',
		defaultMessage:
			'Draggable Image, Ensure your screen reader is not in browse mode. use arrow keys to move & crop the image',
		description: 'Inform about the image crop functionality using arrow keys',
	},
	image_cropper_image_moved: {
		id: 'media.media-avatar-picker.image-cropper.arrow-keys.action',
		defaultMessage:
			'You have moved the image from {key, select, left {left to right} right {right to left} top {top to bottom} other {bottom to top} }, use arrow keys to move & crop the image',
		description: 'Inform about the image movement when the arrow keys are pressed',
	},
	image_cropper_zoom_out: {
		id: 'media.media-avatar-picker.image-cropper.zoom_out',
		defaultMessage: 'Zoom out',
		description: 'Label for the zoom out button in image cropper slider',
	},
	image_cropper_zoom_in: {
		id: 'media.media-avatar-picker.image-cropper.zoom_in',
		defaultMessage: 'Zoom in',
		description: 'Label for the zoom in button in image cropper slider',
	},
	image_cropper_zoom_slider: {
		id: 'media.media-avatar-picker.image-cropper.zoom_slider',
		defaultMessage: 'set zoom',
		description: 'Label for the zoom slider to adjust image zoom',
	},
});
