import '../styles/DKSidebar.css';
export interface IDKButtonGroupProps {
    list: any[];
    className?: string;
    style?: {
        wrapper?: {},
        button?: {}
    };
    onSelect?: (index) => void;
    activeIndex?: number;
    buttonRenderer?: (button, index) => void;
}

function DKButtonGroup(props: IDKButtonGroupProps) {
    const BUTTON_MIN_WIDTH = 60;
    return (
        <div
            className={`d-flex align-items-center shadow-s border-radius-m dk-button-group-wrapper border-m ${props.className} `}
            style={{
                overflow: 'hidden',
                ...props.style?.wrapper
            }}>
            {[...props.list].map((button, index) => {
                if (props.buttonRenderer) {
                    return props.buttonRenderer(button, index);
                } else {
                    return <>
                        <div
                            className={`p-v-s p-h-m cursor-hand dk-button-group-item
                            ${index !== 0 && `border-l-m`}
                            ${props.activeIndex === index ? 'bg-button text-white fw-m' : ''}`}
                            key={`dk-button-group-item-${index}`}
                            style={{
                                minWidth: BUTTON_MIN_WIDTH,
                                maxWidth: BUTTON_MIN_WIDTH,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                ...props.style?.button,
                            }}
                            onClick={() => props.onSelect && props.onSelect(index)}
                        >
                            {button}
                        </div>
                    </>
                }
            })}
        </div >
    )
}

export default DKButtonGroup;
