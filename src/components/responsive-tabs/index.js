import './editor.scss';

const { Component, Fragment } = wp.element

const { __ } = wp.i18n

const {
	Tooltip,
	Button,
} = wp.components

const {
	applyFilters,
} = wp.hooks

export default class ResponsiveTabs extends Component {
	render() {
		const {
			onClick,
			selectedDevice,
		} = this.props;

		return (
			<Fragment>
				<div className="uagb-responsive-tabs">
					<Tooltip text={ __( 'Show options for all devices', 'ultimate-addons-for-gutenberg' ) }>
						<Button
							isPressed={ 'Desktop' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Desktop' );
							} }
						>
							{ __( 'Desktop', 'ultimate-addons-for-gutenberg' ) }
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Show options for tablet devices', 'ultimate-addons-for-gutenberg' ) }>
						<Button
							isPressed={ 'Tablet' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Tablet' );
							} }
						>
							{ __( 'Tablet', 'ultimate-addons-for-gutenberg' ) }
						</Button>
					</Tooltip>

					<Tooltip text={ __( 'Show options for mobile devices', 'ultimate-addons-for-gutenberg' ) }>
						<Button
							isPressed={ 'Mobile' === selectedDevice ? true : false }
							onClick={ () => {
								onClick( 'Mobile' );
							} }
						>
							{ __( 'Mobile', 'ultimate-addons-for-gutenberg' ) }
						</Button>
					</Tooltip>
				</div>

				{ applyFilters( 'uagb.editor.controls', '', 'afterResponsiveTabs', this.props, this.state ) }
			</Fragment>
		);
	}
}
