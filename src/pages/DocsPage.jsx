import RecenterIcon from "../assets/icons/RecenterIcon";
import ZoomInIcon from "../assets/icons/ZoomInIcon";
import ZoomOutIcon from "../assets/icons/ZoomOutIcon";

const DocsPage = () => {
  return (
    <section className="row justify-content-center gx-0">
      <div className="col-lg-8 col-10 ">
        <h1 className="mb-5 mt-3">Components and their options</h1>
        <div>
          <h2>The Chart</h2>
          <p>The chart takes a series of circles and chains them together.</p>
          <ul>
            <li>
              Each circle’s center revolves around the previous circle’s center.
            </li>
            <li>
              The speed at which each circle revolves is constant, and
              determined by its place in the chain, so that each circle is
              slightly faster than the previous one.
            </li>
            <li>
              Each circle has an angle which refers to where along its edge the
              next circle’s center is.
            </li>
            <li> The last circle in the chain draws a fading path.</li>
            <li>
              The chart can be zoomed in or out via the zoom <ZoomInIcon />{" "}
              <ZoomOutIcon /> buttons or with the mouse wheel.
            </li>
            <li>The chart can be panned by clicking and dragging.</li>
            <li>
              The recenter <RecenterIcon /> button will reset the zoom and pan.
            </li>
          </ul>
        </div>
        <div>
          <h2>The Editor</h2>
          <p>
            The Editor lets you remove any circle or add one to the end of the
            chain.
          </p>
          <ul>
            <li>
              Remove a circle by clicking the ‘x’ button to the right of the
              listed circle.
            </li>
            <li>
              Add a circle by inputting a radius and a starting angle (in
              radians) at the bottom of the list of circles and pressing the ‘+’
              button on the right of the inputs.
            </li>
            <li>
              The save button will save your current chain in the Saved Paths.
              The new save's name will be the current time.
            </li>
            <li>
              The reset button will remove all the circles, resulting in an
              empty chain.
            </li>
          </ul>
        </div>
        <div>
          <h2>The Saved Paths</h2>
          <p>
            You can load any of your saved chains made in the Editor, one of the
            default paths, or upload an SVG image.
          </p>
          <ul>
            <li>To load a path, click it.</li>
            <li>To rename a path, double click the name.</li>
            <li>
              To remove a path, click the ‘x’ button to the right of the name.
            </li>
            <li>The 'del all' button removes all the currently saved paths.</li>
            <li>The 'defaults' button will restore any deleted defaults.</li>
            <li>
              To upload an SVG press the upload button and select an SVG with a
              single {"<path>"}.
            </li>
          </ul>
          Note: Any chain can be edited with the Editor, but the changes won’t
          be saved unless you press the save button.
        </div>
      </div>
    </section>
  );
};

export default DocsPage;
