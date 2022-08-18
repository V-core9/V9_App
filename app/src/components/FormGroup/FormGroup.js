export { FormGroup };

function FormGroup({ id, label, type, onChange, value, emptyValue, resetClick, elements }) {
  return (
    <form_group>
      {label && <label for={id} >{label}</label>}
      {type && <input type={type} id={id} value={value} onChange={onChange} />}
      {resetClick && <action className={`${(value !== emptyValue) ? 'visible' : 'hidden'} inputReset`} onClick={resetClick} title="Reset Input Field.">X</action>}
      {elements}
    </form_group>
  )
}
