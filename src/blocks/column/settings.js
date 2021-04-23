import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import GradientSettings from "../../components/gradient-settings"
import Columnresponsive from "../../components/typography/column-responsive"

const { __ } = wp.i18n

const {
	ColorPalette,
	InspectorControls,
	MediaUpload,
	PanelColorSettings,
} = wp.blockEditor

const {
	PanelBody,
	RangeControl,
	SelectControl,
	Button,
	ButtonGroup,
	BaseControl,
} = wp.components

const {
	Fragment,
} = wp.element

export default function columnSettings( props ) {

    const {
        attributes: {
            topPadding,
            bottomPadding,
            leftPadding,
            rightPadding,
            topPaddingTablet,
            bottomPaddingTablet,
            leftPaddingTablet,
            rightPaddingTablet,
            topPaddingMobile,
            bottomPaddingMobile,
            leftPaddingMobile,
            rightPaddingMobile,
            backgroundType,
            backgroundImage,
            backgroundColor,
            backgroundPosition,
            backgroundAttachment,
            backgroundRepeat,
            backgroundSize,
            backgroundOpacity,
            backgroundImageColor,
            borderStyle,
            borderWidth,
            borderRadius,
            borderColor,
            overlayType,
            gradientOverlayColor1,
            gradientOverlayColor2,
            gradientOverlayType,
            gradientOverlayLocation1,
            gradientOverlayLocation2,
            gradientOverlayAngle,
            mobilePaddingType,
            tabletPaddingType,
            desktopPaddingType,
        },
        setAttributes,
        deviceType
    } = props

    /*
	 * Event to set Image as null while removing.
	 */
	const onRemoveImage = () => {
		const { setAttributes } = props

		setAttributes( { backgroundImage: null } )
	}

	/*
	 * Event to set Image as while adding.
	 */
	const onSelectImage = ( media ) => {

		const { setAttributes } = props

		if ( ! media || ! media.url ) {
			setAttributes( { backgroundImage: null } )
			return
		}

		if ( ! media.type || "image" != media.type ) {
			return
		}

		setAttributes( { backgroundImage: media } )
	}

    const layoutSettings = () => {
    
        return (
            <PanelBody title={ __( "Layout", "ultimate-addons-for-gutenberg" ) }>
    
                <RangeControl
                    label={ __( "Columns", "ultimate-addons-for-gutenberg" ) }
                    value={ columns }
                    min={ 0 }
                    max={ 6 }
                    onChange={ ( value ) => setAttributes( { columns: value } ) }
                />
                <SelectControl
                    label={ __( "Stack on", "ultimate-addons-for-gutenberg" ) }
                    value={ stack }
                    options={ [
                        { value: "none", label: __( "None", "ultimate-addons-for-gutenberg" ) },
                        { value: "tablet", label: __( "Tablet & Mobile", "ultimate-addons-for-gutenberg" ) },
                        { value: "mobile", label: __( "Mobile", "ultimate-addons-for-gutenberg" ) },
                    ] }
                    onChange={ ( value ) => setAttributes( { stack: value } ) }
                    help={ __( "Note: Choose on what breakpoint the columns will stack.", "ultimate-addons-for-gutenberg" ) }
                />
                <SelectControl
                    label={ __( "Container Width", "ultimate-addons-for-gutenberg" ) }
                    value={ contentWidth }
                    onChange={ ( value ) => setAttributes( { contentWidth: value } ) }
                    options={ [
                        { value: "theme", label: __( "Theme Container Width", "ultimate-addons-for-gutenberg" ) },
                        { value: "custom", label: __( "Custom", "ultimate-addons-for-gutenberg" ) },
                    ] }
                />
                {
                    contentWidth == "custom" &&
                    (
                        <Fragment>
                            <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
                                <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ widthType === "px" } aria-pressed={ widthType === "px" } min={0} max={2000} onClick={ () => setAttributes( { widthType: "px" } ) }>{ "px" }</Button>
                                <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ widthType === "%" } aria-pressed={ widthType === "%" } min={0} max={100} onClick={ () => setAttributes( { widthType: "%" } ) }>{ "%" }</Button>
                            </ButtonGroup>
                            <RangeControl
                                label={ __( "Inner Width", "ultimate-addons-for-gutenberg" ) }
                                value={ width }
                                min={ 0 }
                                max={ ( "%" == widthType ) ? 100 : 2000 }
                                onChange={ ( value ) => setAttributes( { width: value } ) }
                            />
                        </Fragment>
                    )
                }
                <OptionSelectorControl
                    label={ __( "Column Gap", "ultimate-addons-for-gutenberg" ) }
                    currentOption={ columnGap }
                    options={ [
                        { value: "10", label: __( "Default", "ultimate-addons-for-gutenberg" ), tooltip: __( "Default (10px)", "ultimate-addons-for-gutenberg" ), },
                        { value: "0", label: __( "None", "ultimate-addons-for-gutenberg" ), tooltip: __( "No Gap (0px)", "ultimate-addons-for-gutenberg" ), },
                        { value: "5", label: __( "S", "ultimate-addons-for-gutenberg" ), tooltip: __( "Narrow (5px)", "ultimate-addons-for-gutenberg" ), },
                        { value: "15", label: __( "M", "ultimate-addons-for-gutenberg" ), tooltip: __( "Extended (15px)", "ultimate-addons-for-gutenberg" ), },
                        { value: "20", label: __( "L", "ultimate-addons-for-gutenberg" ), tooltip: __( "Wide (20px)", "ultimate-addons-for-gutenberg" ), },
                        { value: "30", label: __( "XL", "ultimate-addons-for-gutenberg" ), tooltip: __( "Wider (30px)", "ultimate-addons-for-gutenberg" ), }
                    ] }
                    onChange={ ( columnGap ) => setAttributes( { columnGap } ) }
                    help={ __( "Note: The individual Column Gap can be managed from Column Settings.", "ultimate-addons-for-gutenberg" ) }
                />
                <SelectControl
                    label={ __( "HTML Tag", "ultimate-addons-for-gutenberg" ) }
                    value={ tag }
                    onChange={ ( value ) => setAttributes( { tag: value } ) }
                    options={ [
                        { value: "div", label: __( "div", "ultimate-addons-for-gutenberg" ) },
                        { value: "header", label: __( "header", "ultimate-addons-for-gutenberg" ) },
                        { value: "footer", label: __( "footer", "ultimate-addons-for-gutenberg" ) },
                        { value: "main", label: __( "main", "ultimate-addons-for-gutenberg" ) },
                        { value: "article", label: __( "article", "ultimate-addons-for-gutenberg" ) },
                        { value: "section", label: __( "section", "ultimate-addons-for-gutenberg" ) },
                        { value: "aside", label: __( "aside", "ultimate-addons-for-gutenberg" ) },
                        { value: "nav", label: __( "nav", "ultimate-addons-for-gutenberg" ) },
                    ] }
                />
                <ToggleControl
                    label={ __( "Reverse Columns (Tablet & Mobile)", "ultimate-addons-for-gutenberg" ) }
                    checked={ reverseTablet }
                    onChange={ ( value ) => setAttributes( { reverseTablet: ! reverseTablet } ) }
                />
                <ToggleControl
                    label={ __( "Reverse Columns (Mobile)", "ultimate-addons-for-gutenberg" ) }
                    checked={ reverseMobile }
                    onChange={ ( value ) => setAttributes( { reverseMobile: ! reverseMobile } ) }
                />
            </PanelBody>
        );
    }

    const spacingSettings = () => {
    
        return (

            <PanelBody title={ __( "Spacing", "ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
                <Columnresponsive/>
                { "Desktop" === deviceType && (
                    <Fragment>
                        <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
                            <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "px" } aria-pressed={ desktopPaddingType === "px" } onClick={ () => setAttributes( { desktopPaddingType: "px" } ) }>{ "px" }</Button>
                            <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ desktopPaddingType === "%" } aria-pressed={ desktopPaddingType === "%" } onClick={ () => setAttributes( { desktopPaddingType: "%" } ) }>{ "%" }</Button>
                        </ButtonGroup>
                        <h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
                        <RangeControl
                            label={ UAGB_Block_Icons.top_margin }
                            className={ "uagb-margin-control" }
                            value={ topPadding }
                            onChange={ ( value ) => setAttributes( { topPadding: value } ) }
                            min={ 0 }
                            max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.bottom_margin }
                            className={ "uagb-margin-control" }
                            value={ bottomPadding }
                            onChange={ ( value ) => setAttributes( { bottomPadding: value } ) }
                            min={ 0 }
                            max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.left_margin }
                            className={ "uagb-margin-control" }
                            value={ leftPadding }
                            onChange={ ( value ) => setAttributes( { leftPadding: value } ) }
                            min={ 0 }
                            max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.right_margin }
                            className={ "uagb-margin-control" }
                            value={ rightPadding }
                            onChange={ ( value ) => setAttributes( { rightPadding: value } ) }
                            min={ 0 }
                            max={ ( "%" == desktopPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                    </Fragment>
                )}
                { "Tablet" === deviceType && (
                    <Fragment>
                        <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type", "ultimate-addons-for-gutenberg" ) }>
                            <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "px" } aria-pressed={ tabletPaddingType === "px" } onClick={ () => setAttributes( { tabletPaddingType: "px" } ) }>{ "px" }</Button>
                            <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ tabletPaddingType === "%" } aria-pressed={ tabletPaddingType === "%" } onClick={ () => setAttributes( { tabletPaddingType: "%" } ) }>{ "%" }</Button>
                        </ButtonGroup>
                        <h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
                        <RangeControl
                            label={ UAGB_Block_Icons.top_margin }
                            className={ "uagb-margin-control" }
                            value={ topPaddingTablet }
                            onChange={ ( value ) => setAttributes( { topPaddingTablet: value } ) }
                            min={ 0 }
                            max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.bottom_margin }
                            className={ "uagb-margin-control" }
                            value={ bottomPaddingTablet }
                            onChange={ ( value ) => setAttributes( { bottomPaddingTablet: value } ) }
                            min={ 0 }
                            max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.left_margin }
                            className={ "uagb-margin-control" }
                            value={ leftPaddingTablet }
                            onChange={ ( value ) => setAttributes( { leftPaddingTablet: value } ) }
                            min={ 0 }
                            max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.right_margin }
                            className={ "uagb-margin-control" }
                            value={ rightPaddingTablet }
                            onChange={ ( value ) => setAttributes( { rightPaddingTablet: value } ) }
                            min={ 0 }
                            max={ ( "%" == tabletPaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                    </Fragment>
                )}
                { "Mobile" === deviceType && (
                    <Fragment>
                        <ButtonGroup className="uagb-size-type-field" aria-label={ __( "Size Type" ) }>
                            <Button key={ "px" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "px" } aria-pressed={ mobilePaddingType === "px" } onClick={ () => setAttributes( { mobilePaddingType: "px" } ) }>{ "px" }</Button>
                            <Button key={ "%" } className="uagb-size-btn" isSmall isPrimary={ mobilePaddingType === "%" } aria-pressed={ mobilePaddingType === "%" } onClick={ () => setAttributes( { mobilePaddingType: "%" } ) }>{ "%" }</Button>
                        </ButtonGroup>
                        <h2>{ __( "Padding", "ultimate-addons-for-gutenberg" ) }</h2>
                        <RangeControl
                            label={ UAGB_Block_Icons.top_margin }
                            className={ "uagb-margin-control" }
                            value={ topPaddingMobile }
                            onChange={ ( value ) => setAttributes( { topPaddingMobile: value } ) }
                            min={ 0 }
                            max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.bottom_margin }
                            className={ "uagb-margin-control" }
                            value={ bottomPaddingMobile }
                            onChange={ ( value ) => setAttributes( { bottomPaddingMobile: value } ) }
                            min={ 0 }
                            max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.left_margin }
                            className={ "uagb-margin-control" }
                            value={ leftPaddingMobile }
                            onChange={ ( value ) => setAttributes( { leftPaddingMobile: value } ) }
                            min={ 0 }
                            max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                        <RangeControl
                            label={ UAGB_Block_Icons.right_margin }
                            className={ "uagb-margin-control" }
                            value={ rightPaddingMobile }
                            onChange={ ( value ) => setAttributes( { rightPaddingMobile: value } ) }
                            min={ 0 }
                            max={ ( "%" == mobilePaddingType ) ? 100 : 2000 }
                            allowReset
                        />
                    </Fragment>
                )}
            </PanelBody>
        );
    }

    const backgroundSettings = () => {
    
        return (
            <PanelBody title={ __( "Background", "ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
                <SelectControl
                    label={ __( "Background Type", "ultimate-addons-for-gutenberg" ) }
                    value={ backgroundType }
                    onChange={ ( value ) => setAttributes( { backgroundType: value } ) }
                    options={ [
                        { value: "none", label: __( "None", "ultimate-addons-for-gutenberg" ) },
                        { value: "color", label: __( "Color", "ultimate-addons-for-gutenberg" ) },
                        { value: "gradient", label: __( "Gradient", "ultimate-addons-for-gutenberg" ) },
                        { value: "image", label: __( "Image", "ultimate-addons-for-gutenberg" ) }
                    ] }
                />
                { "color" == backgroundType && (
                    <Fragment>
                        <p className="uagb-setting-label">{ __( "Background Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundColor }} ></span></span></p>
                        <ColorPalette
                            value={ backgroundColor }
                            onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
                            allowReset
                        />
                    </Fragment>
                ) }
                { "image" == backgroundType &&
                        ( <Fragment>
                            <BaseControl
                                className="editor-bg-image-control"
                                label={ __( "Background Image", "ultimate-addons-for-gutenberg" ) }>
                                <MediaUpload
                                    title={ __( "Select Background Image", "ultimate-addons-for-gutenberg" ) }
                                    onSelect={ onSelectImage }
                                    allowedTypes={ [ "image" ] }
                                    value={ backgroundImage }
                                    render={ ( { open } ) => (
                                        <Button isSecondary onClick={ open }>
                                            { ! backgroundImage ? __( "Select Background Image", "ultimate-addons-for-gutenberg" ) : __( "Replace image", "ultimate-addons-for-gutenberg" ) }
                                        </Button>
                                    ) }
                                />
                                { backgroundImage &&
                                    ( <Button className="uagb-rm-btn" onClick={ onRemoveImage } isLink isDestructive>
                                        { __( "Remove Image", "ultimate-addons-for-gutenberg" ) }
                                    </Button> )
                                }
                            </BaseControl>
                            { backgroundImage &&
                                ( <Fragment>
                                    <SelectControl
                                        label={ __( "Image Position", "ultimate-addons-for-gutenberg" ) }
                                        value={ backgroundPosition }
                                        onChange={ ( value ) => setAttributes( { backgroundPosition: value } ) }
                                        options={ [
                                            { value: "top-left", label: __( "Top Left", "ultimate-addons-for-gutenberg" ) },
                                            { value: "top-center", label: __( "Top Center", "ultimate-addons-for-gutenberg" ) },
                                            { value: "top-right", label: __( "Top Right", "ultimate-addons-for-gutenberg" ) },
                                            { value: "center-left", label: __( "Center Left", "ultimate-addons-for-gutenberg" ) },
                                            { value: "center-center", label: __( "Center Center", "ultimate-addons-for-gutenberg" ) },
                                            { value: "center-right", label: __( "Center Right", "ultimate-addons-for-gutenberg" ) },
                                            { value: "bottom-left", label: __( "Bottom Left", "ultimate-addons-for-gutenberg" ) },
                                            { value: "bottom-center", label: __( "Bottom Center", "ultimate-addons-for-gutenberg" ) },
                                            { value: "bottom-right", label: __( "Bottom Right", "ultimate-addons-for-gutenberg" ) },
                                        ] }
                                    />
                                    <SelectControl
                                        label={ __( "Attachment", "ultimate-addons-for-gutenberg" ) }
                                        value={ backgroundAttachment }
                                        onChange={ ( value ) => setAttributes( { backgroundAttachment: value } ) }
                                        options={ [
                                            { value: "fixed", label: __( "Fixed", "ultimate-addons-for-gutenberg" ) },
                                            { value: "scroll", label: __( "Scroll", "ultimate-addons-for-gutenberg" ) }
                                        ] }
                                    />
                                    <SelectControl
                                        label={ __( "Repeat", "ultimate-addons-for-gutenberg" ) }
                                        value={ backgroundRepeat }
                                        onChange={ ( value ) => setAttributes( { backgroundRepeat: value } ) }
                                        options={ [
                                            { value: "no-repeat", label: __( "No Repeat", "ultimate-addons-for-gutenberg" ) },
                                            { value: "repeat", label: __( "Repeat", "ultimate-addons-for-gutenberg" ) },
                                            { value: "repeat-x", label: __( "Repeat-x", "ultimate-addons-for-gutenberg" ) },
                                            { value: "repeat-y", label: __( "Repeat-y", "ultimate-addons-for-gutenberg" ) }
                                        ] }
                                    />
                                    <SelectControl
                                        label={ __( "Size", "ultimate-addons-for-gutenberg" ) }
                                        value={ backgroundSize }
                                        onChange={ ( value ) => setAttributes( { backgroundSize: value } ) }
                                        options={ [
                                            { value: "auto", label: __( "Auto", "ultimate-addons-for-gutenberg" ) },
                                            { value: "cover", label: __( "Cover", "ultimate-addons-for-gutenberg" ) },
                                            { value: "contain", label: __( "Contain", "ultimate-addons-for-gutenberg" ) }
                                        ] }
                                    />
                                    <SelectControl
                                        label={ __( "Image Overlay Type", "ultimate-addons-for-gutenberg" ) }
                                        value={ overlayType }
                                        onChange={ ( value ) => setAttributes( { overlayType: value } ) }
                                        options={ [
                                            { value: "color", label: __( "Color", "ultimate-addons-for-gutenberg" ) },
                                            { value: "gradient", label: __( "Gradient", "ultimate-addons-for-gutenberg" ) },
                                        ] }
                                    />
                                    { "color" == overlayType &&<Fragment>
                                        <p className="uagb-setting-label">{ __( "Image Overlay Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: backgroundImageColor }} ></span></span></p>
                                        <ColorPalette
                                            value={ backgroundImageColor }
                                            onChange={ ( colorValue ) => setAttributes( { backgroundImageColor: colorValue } ) }
                                            allowReset
                                        />
                                    </Fragment>
                                    }

                                    { "gradient" == overlayType &&
                                        ( <Fragment>
                                            <PanelColorSettings
                                                title={ __( "Color Settings", "ultimate-addons-for-gutenberg" ) }
                                                colorSettings={ [
                                                    {
                                                        value: gradientOverlayColor2,
                                                        onChange:( value ) => setAttributes( { gradientOverlayColor2: value } ),
                                                        label: __( "Color 1", "ultimate-addons-for-gutenberg" ),
                                                    },
                                                    {
                                                        value: gradientOverlayColor1,
                                                        onChange:( value ) => setAttributes( { gradientOverlayColor1: value } ),
                                                        label: __( "Color 2", "ultimate-addons-for-gutenberg" ),
                                                    },
                                                ] }
                                            >
                                            </PanelColorSettings>
                                            <SelectControl
                                                label={ __( "Type", "ultimate-addons-for-gutenberg" ) }
                                                value={ gradientOverlayType }
                                                onChange={ ( value ) => setAttributes( { gradientOverlayType: value } ) }
                                                options={ [
                                                    { value: "linear", label: __( "Linear", "ultimate-addons-for-gutenberg" ) },
                                                    { value: "radial", label: __( "Radial", "ultimate-addons-for-gutenberg" ) },
                                                ] }
                                            />
                                            <RangeControl
                                                label={ __( "Location 1", "ultimate-addons-for-gutenberg" ) }
                                                value={ gradientOverlayLocation1 }
                                                onChange={ ( value ) => setAttributes( { gradientOverlayLocation1: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                            <RangeControl
                                                label={ __( "Location 2", "ultimate-addons-for-gutenberg" ) }
                                                value={ gradientOverlayLocation2 }
                                                onChange={ ( value ) => setAttributes( { gradientOverlayLocation2: value } ) }
                                                min={ 0 }
                                                max={ 100 }
                                                allowReset
                                            />
                                            <RangeControl
                                                label={ __( "Angle", "ultimate-addons-for-gutenberg" ) }
                                                value={ gradientOverlayAngle }
                                                onChange={ ( value ) => setAttributes( { gradientOverlayAngle: value } ) }
                                                min={ 0 }
                                                max={ 360 }
                                                allowReset
                                            />
                                        </Fragment> )
                                    }
                                </Fragment> )
                            }
                        </Fragment> )
                }
                { "gradient" == backgroundType &&
                        ( <Fragment>
                            <GradientSettings attributes={ props.attributes }	setAttributes={ setAttributes }/>
                        </Fragment> )
                }
                { ( "color" == backgroundType || ( "image" == backgroundType && backgroundImage ) || "gradient" == backgroundType ) &&
                        ( <RangeControl
                            label={ __( "Opacity" ) }
                            value={ backgroundOpacity }
                            onChange={ ( value ) => setAttributes( { backgroundOpacity: value } ) }
                            min={ 0 }
                            max={ 100 }
                            allowReset
                            initialPosition={0}
                        /> )
                }
            </PanelBody>
        );
    }

    const borderSettings = () => {
    
        return (

            <PanelBody title={ __( "Border", "ultimate-addons-for-gutenberg" ) } initialOpen={ false }>
                <SelectControl
                    label={ __( "Border Style", "ultimate-addons-for-gutenberg" ) }
                    value={ borderStyle }
                    onChange={ ( value ) => setAttributes( { borderStyle: value } ) }
                    options={ [
                        { value: "none", label: __( "None", "ultimate-addons-for-gutenberg" ) },
                        { value: "solid", label: __( "Solid", "ultimate-addons-for-gutenberg" ) },
                        { value: "dotted", label: __( "Dotted", "ultimate-addons-for-gutenberg" ) },
                        { value: "dashed", label: __( "Dashed", "ultimate-addons-for-gutenberg" ) },
                        { value: "double", label: __( "Double", "ultimate-addons-for-gutenberg" ) },
                        { value: "groove", label: __( "Groove", "ultimate-addons-for-gutenberg" ) },
                        { value: "inset", label: __( "Inset", "ultimate-addons-for-gutenberg" ) },
                        { value: "outset", label: __( "Outset", "ultimate-addons-for-gutenberg" ) },
                        { value: "ridge", label: __( "Ridge", "ultimate-addons-for-gutenberg" ) },
                    ] }
                />
                { "none" != borderStyle && (
                    <RangeControl
                        label={ __( "Border Width", "ultimate-addons-for-gutenberg" ) }
                        value={ borderWidth }
                        onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
                        min={ 0 }
                        max={ 50 }
                        allowReset
                    />
                ) }
                <RangeControl
                    label={ __( "Border Radius", "ultimate-addons-for-gutenberg" ) }
                    value={ borderRadius }
                    onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
                    min={ 0 }
                    max={ 100 }
                    allowReset
                />
                { "none" != borderStyle && (
                    <Fragment>
                        <p className="uagb-setting-label">{ __( "Border Color", "ultimate-addons-for-gutenberg" ) }<span className="components-base-control__label"><span className="component-color-indicator" style={{ backgroundColor: borderColor }} ></span></span></p>
                        <ColorPalette
                            value={ borderColor }
                            onChange={ ( colorValue ) => setAttributes( { borderColor: colorValue } ) }
                            allowReset
                        />
                    </Fragment>
                ) }
            </PanelBody>
        );
    }

    return (
        <InspectorControls>
            { layoutSettings() }
            { spacingSettings() }
            { backgroundSettings() }
            { borderSettings() }
        </InspectorControls>
    );
}