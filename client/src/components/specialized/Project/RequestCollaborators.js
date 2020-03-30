import React from "react";

// This component shows an individual project's view
export function RequestCollaborators(props) {
  return (
    <Form inline className="p-2" onSubmit={onSubmit}>
      <FormControl
        type="text"
        placeholder="Request a collaborator"
        className="mr-sm-3"
        style={{ height: 30, marginTop: "10px" }}
        value={search}
        onChange={onChange}
      />
      <Button type="submit" style={{ marginTop: "10px" }}>
        Submit
      </Button>
    </Form>
  );
}
