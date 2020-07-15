# OpenEBS Pool Container Failure

## Experiment Metadata

<table>
<tr>
<th> Name </th>
<th> Description </th>
<th> Documentation Link </th>
</tr>
<tr>
 <td> OpenEBS Pool Container Failure  </td>
 <td> Kill the pool container and check if it gets scheduled again. This scenario validates the behaviour of application and OpenEBS persistent volumes when chaos is induced on the storage pool. The litmus experiment fails the specified pool thereby losing the access to volume replicas created on it.
 </td>
 <td>  <a href="https://docs.litmuschaos.io/docs/openebs-pool-container-failure/"> Here </a> </td>
 </tr>
 </table>

### Pipeline Runs


| Job ID |   Test Description         | Execution Time | Release Tag   | Test Result   |
 |---------|---------------------------| --------------|--------|--------|
 |    <a href= "https://gitlab.mayadata.io/litmuschaos/litmus-e2e/-/jobs/177011">177011</a>   |  OpenEBS Pool Container Failure test           |  Wed Jul 15 16:20:21 2020(IST)     |latest  |Passed :smiley:  |