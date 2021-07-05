/**
 * External dependencies
 */
 import './editor.scss';
 import { __ } from '@wordpress/i18n';
 import { TabPanel, Dashicon } from '@wordpress/components';
 import { useDispatch } from '@wordpress/data';
 import Range from '../../components/range/Range.js';
 
 const RangeTypographyControl = props =>  {

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
					className: `uagb-spacing-control__mobile-controls-item uagb-spacing-control__mobile-controls-item--spacing components-button is-button is-default is-secondary uagb-spacing-control__mobile-controls-item--default uagb-spacing-control__mobile-controls-item-spacing--default`,
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
						<div className="uagb-spacing-control__inputs">
							<Range 
								label={ __( props.sizeMobileText ) }
								value={ props.sizeMobile.value }
								onChange={ ( value ) => props.setAttributes( { [props.sizeMobileLabel]: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						</div>
					)
				} else if ( "tablet" === tab.name ) {
					tabout = (
						<div className="uagb-spacing-control__inputs">
							<Range 
								label={ __( props.sizeTabletText ) }
								value={ props.sizeTablet.value }
								onChange={ ( value ) => props.setAttributes( { [props.sizeTabletLabel]: value } ) }
								min={ 0 }
								max={ 100 }
							/>
						</div>
					)
				} else {
					tabout = (
						<div className="uagb-spacing-control__inputs">
							<Range 
								label={ __( props.sizeText ) }
								value={ props.size.value || "" }
								onChange={ ( value ) => props.setAttributes( { [props.sizeLabel]: value } ) }
								min={ 0 }
								max={ 100 }
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