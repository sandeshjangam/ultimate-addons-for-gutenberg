/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';

const {
	ButtonGroup,
	Button,
	Dashicon,
	TabPanel,
} = wp.components

// Extend component
const { Fragment } = wp.element
const { useSelect, useDispatch } = wp.data;
import map from 'lodash/map';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function Columnresponsive ( props ) {
	const deviceType = useSelect( ( select ) => {
		return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
    }, [] );
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( 'core/edit-post' );
	const customSetPreviewDeviceType = ( device ) => {
		setPreviewDeviceType( device );
    };
	// const devices = [
	// 	{
	// 		name: 'Desktop',
	// 		title: <Dashicon icon="desktop" />,
	// 		itemClass: 'uagb-desktop-tab uagb-responsive-tabs',
	// 	},
	// 	{
	// 		name: 'Tablet',
	// 		title: <Dashicon icon="tablet" />,
	// 		itemClass: 'uagb-tablet-tab uagb-responsive-tabs',
	// 	},
	// 	{
	// 		name: 'Mobile',
	// 		key: 'mobile',
	// 		title: <Dashicon icon="smartphone" />,
	// 		itemClass: 'uagb-mobile-tab uagb-responsive-tabs',
	// 	},
	// ];
	const output = {};
	output.Desktop = (
        <Fragment></Fragment>
	);
	output.Tablet = (
        <Fragment></Fragment>
	);
	output.Mobile = (
        <Fragment></Fragment>
	);

	const onSelectDevice = ( tabName ) => {

		
		let selected = 'desktop';
		switch ( tabName ) {
			case 'desktop':
				selected = 'tablet';
				customSetPreviewDeviceType( 'Desktop' )
				break;
			case 'tablet':
				selected = 'mobile';
				customSetPreviewDeviceType( 'Tablet' )
				break;
			case 'mobile':
				selected = 'desktop';
				customSetPreviewDeviceType( 'Mobile' )
				break;
			default:
				break;
		}
	
		const buttons = document.getElementsByClassName( `uagb-spacing-control__mobile-controls-item--spacing` );
	
		for( let i = 0; i < buttons.length; i++ ) {
			buttons[ i ].style.display = 'none';
		}
	
		if ( tabName === 'default' ) {
			const button = document.getElementsByClassName( `uagb-spacing-control__mobile-controls-item-spacing--tablet` );
			button[ 0 ].click();
		} else {
			const button = document.getElementsByClassName( `uagb-spacing-control__mobile-controls-item-spacing--${ selected }` );
			button[ 0 ].style.display = 'block';
		}
	};

	return (
		<TabPanel
			className="uagb-spacing-control__mobile-controls"
			activeClass="is-active"
			initialTabName="default"
			onSelect={ onSelectDevice }
			tabs={ [
				{
					name: 'default',
					title: <Dashicon icon="desktop" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--${ props.type } components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--default uagb-spacing-control__mobile-controls-item-${ props.type }--default`,
				},
				{
					name: "desktop",
					title: <Dashicon icon="smartphone" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--desktop uagb-spacing-control__mobile-controls-item-spacing--desktop`,
				},
				{
					name: "tablet",
					title: <Dashicon icon="desktop" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--tablet uagb-spacing-control__mobile-controls-item-spacing--tablet`,
				},
				{
					name: "mobile",
					title: <Dashicon icon="tablet" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--mobile uagb-spacing-control__mobile-controls-item-spacing--mobile`,
				},
			] }>
			{ ( tab ) => {
				let tabout
				if ( "mobile" === tab.name ) {
					tabout = (
                        // deviceControls( devices ),
						output.Desktop
					)
				} else if ( "tablet" === tab.name ) {
					tabout = (
                        // deviceControls( devices ),
						output.Tablet
					)
				} else {
					tabout = (
                        // deviceControls( devices ),
						output.Mobile
					)
				}

				return <div>{ tabout }</div>
			}
		}
		</TabPanel>
	);
}