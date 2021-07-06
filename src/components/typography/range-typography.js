/**
 * External dependencies
 */
 import './editor.scss';
 import { __ } from '@wordpress/i18n';
 import { TabPanel, Dashicon } from '@wordpress/components';
 import { useDispatch } from '@wordpress/data';
 import { useState } from '@wordpress/element';
 import Range from '../../components/range/Range.js';
 
 const RangeTypographyControl = props =>  {
console.log(props);
	const [ device, setDevice ] = useState( 'default' );

	let deviceClass = 'device-' + device;

	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch( 'core/edit-post' );

	const customSetPreviewDeviceType = ( device ) => {
		setPreviewDeviceType( device );
    };
    
	const onSelectDevice = ( tabName ) => {

		let selected = 'desktop';
		switch ( tabName ) {
			case 'desktop':
			case 'default':
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
		
		setDevice( selected );
	};
	
	return (
			<div className='components-base-control uagb-spacing-control'>
			<TabPanel
				className="uagb-spacing-control__mobile-controls"
				activeClass="is-active"
				initialTabName="default"
				onSelect={ onSelectDevice }
				tabs={ [
					{
						name: 'default',
						title: <Dashicon icon="desktop" />,
						className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--default uagb-spacing-control__mobile-controls-item-spacing--default ${deviceClass}`,
					},
					{
						name: "desktop",
						title: <Dashicon icon="smartphone" />,
						className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--desktop uagb-spacing-control__mobile-controls-item-spacing--desktop ${deviceClass}`,
					},
					{
						name: "tablet",
						title: <Dashicon icon="desktop" />,
						className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--tablet uagb-spacing-control__mobile-controls-item-spacing--tablet ${deviceClass}`,
					},
					{
						name: "mobile",
						title: <Dashicon icon="tablet" />,
						className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--mobile uagb-spacing-control__mobile-controls-item-spacing--mobile ${deviceClass}`,
					},
				] }
			>
			{ ( tab ) => {
				let tabout
				if ( "mobile" === tab.name ) {
					tabout = (
						<div className="uagb-spacing-control__inputs">
							<Range 
								setAttributes = { props.setAttributes }
								label={ __( props.sizeMobileText ) }
								value={ props.sizeMobile.value }
								onChange={ ( value ) => props.setAttributes( { [props.sizeMobileLabel]: value } ) }
								min={ 0 }
								max={ 100 }
								unit = { props.fontSizeType }
							/>
						</div>
					)
				} else if ( "tablet" === tab.name ) {
					tabout = (
						<div className="uagb-spacing-control__inputs">
							<Range 
								setAttributes = { props.setAttributes }
								label={ __( props.sizeTabletText ) }
								value={ props.sizeTablet.value }
								onChange={ ( value ) => props.setAttributes( { [props.sizeTabletLabel]: value } ) }
								min={ 0 }
								max={ 100 }
								unit = { props.fontSizeType }
							/>
						</div>
					)
				} else {
					tabout = (
						<div className="uagb-spacing-control__inputs">
							<Range 
								setAttributes = { props.setAttributes }
								label={ __( props.sizeText ) }
								value={ props.size.value || "" }
								onChange={ ( value ) => props.setAttributes( { [props.sizeLabel]: value } ) }
								min={ 0 }
								max={ 100 }
								unit = { props.fontSizeType }
							/>
						</div>
					)
				}

				return <div>{ tabout }</div>
			}
		}
		</TabPanel>
		</div>
	);
 }

export default RangeTypographyControl