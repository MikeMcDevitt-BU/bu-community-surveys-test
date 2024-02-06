import { useState } from "react";

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const Title = product.active ? (
    product.Title
  ) : (
    <span style={{ color: "red" }}>{product.Title}</span>
  );

  return (
    <tr>
      <th scope="row">{Title}</th>
      <td>{product.Sponsor}</td>
    </tr>
  );
}

function ProductTable({ products, filterText, activeOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach((product) => {
    if (product.Title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (activeOnly && !product.active) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.Title} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <caption>List of BU Community Surveys</caption>
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Sponsor</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({
  filterText,
  activeOnly,
  onFilterTextChange,
  onActiveOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={activeOnly}
          onChange={(e) => onActiveOnlyChange(e.target.checked)}
        />{" "}
        Only show active surveys
      </label>
    </form>
  );
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  return (
    <div>
      <SearchBar
        filterText={filterText}
        activeOnly={activeOnly}
        onFilterTextChange={setFilterText}
        onActiveOnlyChange={setActiveOnly}
      />
      <ProductTable products={products} />
    </div>
  );
}

const PRODUCTS = [
  {
    Title: "National Survey of Student Engagement (NSSE)",
    TargetPopulation: "First year and senior undergraduates",
    Sponsor: "Amie Grills / Christine Mcguire",
    Cycle: "Even Years",
    active: true,
  },
  {
    Title: "LGBTQIA+ Center Evaluation Survey",
    TargetPopulation: "Faculty / Staff",
    Sponsor: "Debbie Barzarsky",
    Cycle: "New",
    active: true,
  },
  {
    Title: "HUB Survey",
    TargetPopulation: "Undergraduates",
    Sponsor: "Amanda Urias",
    Cycle: "Annual",
    active: false,
  },
  {
    Title: "DEI Tech Collective Survey",
    TargetPopulation: "Computing and Data Science Students",
    Sponsor: "DEI Tech Collective",
    Cycle: "Even Years",
    active: true,
  },
  {
    Title: "Sexual Misconduct and Harrassment Climate Survey",
    TargetPopulation: "All Students",
    Sponsor: "Committee on Sexual Assault and Harrassment Prevention (CSAHP)",
    Cycle: "Every 4 Years",
    active: true,
  },
  {
    Title: "Healthy Minds Survey",
    TargetPopulation: "All Students",
    Sponsor: "Student Health Services",
    Cycle: "Every 3 Years",
    active: false,
  },
  {
    Title: "Dining Services Survey",
    TargetPopulation: "On-campus students",
    Sponsor: "Dining Services",
    Cycle: "TBD",
    active: false,
  },
  {
    Title: "University Housing Survey",
    TargetPopulation: "Students in Housing",
    Sponsor: "Housing Office",
    Cycle: "TBD",
    active: true,
  },
  {
    Title: "Princeton Review",
    TargetPopulation: "",
    Sponsor: "",
    Cycle: "",
    active: true,
  },
  {
    Title: "Sustainability",
    TargetPopulation: "",
    Sponsor: "",
    Cycle: "",
    active: true,
  },
  {
    Title: "Community Safety Advisory Group",
    TargetPopulation: "",
    Sponsor: "",
    Cycle: "",
    active: false,
  },
  {
    Title: "Belonging & Culture",
    TargetPopulation: "",
    Sponsor: "",
    Cycle: "",
    active: false,
  },
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
