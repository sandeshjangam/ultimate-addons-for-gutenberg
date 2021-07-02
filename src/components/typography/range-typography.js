/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import Range from '../../components/range/Range.js';

const {
	ButtonGroup,
	Button,
	Dashicon,
	TabPanel
} = wp.components

// Extend component
const { Fragment } = wp.element
const { useSelect, useDispatch } = wp.data;
import map from 'lodash/map';

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function RangeTypographyControl ( props ) {
	const deviceType = useSelect( ( select ) => {
		return select( 'core/edit-post' ).__experimentalGetPreviewDeviceType();
	}, [] );
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( 'core/edit-post' );
	const customSetPreviewDeviceType = ( device ) => {
		setPreviewDeviceType( device );
	};
	const devices = [
		{
			name: 'Desktop',
			title: <Dashicon icon="desktop" />,
			itemClass: 'uagb-desktop-tab uagb-responsive-tabs',
		},
		{
			name: 'Tablet',
			title: <Dashicon icon="tablet" />,
			itemClass: 'uagb-tablet-tab uagb-responsive-tabs',
		},
		{
			name: 'Mobile',
			key: 'mobile',
			title: <Dashicon icon="smartphone" />,
			itemClass: 'uagb-mobile-tab uagb-responsive-tabs',
		},
	];
 	let sizeTypes

	if( "sizeTypes" in props ) {
		sizeTypes = props.sizeTypes
	} else {
		sizeTypes = [
			{ key: "px", name: __( "px",'ultimate-addons-for-gutenberg' ) },
			{ key: "em", name: __( "em",'ultimate-addons-for-gutenberg' ) },
		]
	}

	const sizeTypesControls = (
		<ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type",'ultimate-addons-for-gutenberg' ) }>
			{ map( sizeTypes, ( { name, key } ) => (
				<Button
					key={ key }
					className="uagb-size-btn"
					isSmall
					isPrimary={ props.type.value === key }
					aria-pressed={ props.type.value === key }
					onClick={ () => props.setAttributes( { [props.typeLabel]: key } ) }
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	)

	const onSelectDevice = ( tabName ) => {

		console.log(tabName)
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
	
		const buttons = document.getElementsByClassName( `uagb-typography-responsive-size-control` );
	console.log(buttons);
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
	}

	const output = {};
	output.Desktop = (
		<Fragment>
			{sizeTypesControls}
			<Range 
				label={ __( props.sizeText ) }
				value={ props.size.value || "" }
				onChange={ ( value ) => props.setAttributes( { [props.sizeLabel]: value } ) }
				min={ 0 }
				max={ 100 }
				displayUnit={ false }
			/>
		</Fragment>
	);
	output.Tablet = (
		<Fragment>
			{sizeTypesControls}
			<Range 
				label={ __( props.sizeTabletText ) }
				value={ props.sizeTablet.value }
				onChange={ ( value ) => props.setAttributes( { [props.sizeTabletLabel]: value } ) }
				min={ 0 }
				max={ 100 }
				displayUnit={ false }
			/>
		</Fragment>
	);
	output.Mobile = (
		<Fragment>
			{sizeTypesControls}
			<Range 
				label={ __( props.sizeMobileText ) }
				value={ props.sizeMobile.value }
				onChange={ ( value ) => props.setAttributes( { [props.sizeMobileLabel]: value } ) }
				min={ 0 }
				max={ 100 }
				displayUnit={ false }
			/>
		</Fragment>
	);
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
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing uagb-typography-responsive-size-control components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--default uagb-spacing-control__mobile-controls-item-spacing--default`,
				},
				{
					name: "desktop",
					title: <Dashicon icon="smartphone" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing uagb-typography-responsive-size-control components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--desktop uagb-spacing-control__mobile-controls-item-spacing--desktop`,
				},
				{
					name: "tablet",
					title: <Dashicon icon="desktop" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing uagb-typography-responsive-size-control components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--tablet uagb-spacing-control__mobile-controls-item-spacing--tablet`,
				},
				{
					name: "mobile",
					title: <Dashicon icon="tablet" />,
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing uagb-typography-responsive-size-control components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--mobile uagb-spacing-control__mobile-controls-item-spacing--mobile`,
				},
			] }>
			{ ( tab ) => {
				let tabout
				if ( "mobile" === tab.name ) {
					tabout = (
						output.Mobile
					)
				} else if ( "tablet" === tab.name ) {
					tabout = (
						output.Tablet
					)
				} else {
					tabout = (
						output.Desktop
					)
				}

				return <div>{ tabout }</div>
				}
			}
		</TabPanel>
	);
}