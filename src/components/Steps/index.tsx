import "./index.css";

export type StepsProps = {
  title?: string;
  currentStep?: number;
  steps: {
    title: string;
    description?: string;
    time?: string;
  }[];
};

export default function Steps({ data }: { data: StepsProps }) {
  const { title, currentStep = 1, steps } = data;
  return (
    <div className="steps">
      <h3 className="timeline-title">{title}</h3>
      <ul className="timeline">
        {steps.map((step, idx) => {
          return (
            <li
              className={`${idx % 2 === 0 ? "timeline" : "timeline"} ${
                currentStep === idx + 1 ? "active" : ""
              }`}
            >
              <div className="timeline-badge">
                <a>
                  <i className="fa fa-circle" id=""></i>
                </a>
              </div>
              <div className="timeline-panel">
                <div className="timeline-heading">
                  <h4>{step.title}</h4>
                </div>
                <div className="timeline-body">
                  <p>{step.description}</p>
                </div>
                {step.time && (
                  <div className="timeline-footer">
                    <p className="text-right">{step?.time}</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
        <li className="clearfix no-float"></li>
      </ul>
    </div>
  );
}
