const {
	InspectorControls,
} = wp.blockEditor

const { __ } = wp.i18n

export default function faqChildSettings() {

    const faqChildControls = () => {

		return (
			<p className="uagb-settings-notice">{ __( "For the styling options please select the Parent Block." ) }</p>
		)
	}

    return (

        <InspectorControls>
            { faqChildControls }
        </InspectorControls>
    );
}