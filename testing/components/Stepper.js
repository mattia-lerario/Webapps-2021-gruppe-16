const steps = [{ name: 'Hjem' }, { name: 'Game' }, { name: 'End' }]

const Stepper = () => {
  const [step, setStep] = useState(0)

  return (
    <>
      {step + 1 < steps.length ? (
        <button type="button" onClick={() => setStep(step + 1)}>
          {steps[step + 1].name}
        </button>
      ) : null}
    </>
  )
}