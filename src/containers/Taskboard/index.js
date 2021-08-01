import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
// eslint-disable-next-line import/no-cycle
import * as taskActions from '../../actions/task';
import SearchBox from '../../components/SearchBox';
import TaskList from '../../components/TaskList';
// eslint-disable-next-line import/no-cycle
import { STATUSES } from '../../constants';
// eslint-disable-next-line import/no-cycle
import TaskForm from '../TaskForm';
import styles from './styles';

class TaskBoard extends Component {
  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

  handleEditTask = (task) => {
    const { taskActionCreators, modalActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(task);
    const { showModal, changeModalTitle, changeModalContent } =
      modalActionCreators;
    showModal();
    changeModalTitle('Update work');
    changeModalContent(<TaskForm />);
  };

  handleDeleteTask(task) {
    const { id } = task;
    const { taskActionCreators } = this.props;
    const { deleteTask } = taskActionCreators;
    deleteTask(id);
  }

  openForm = () => {
    const { modalActionCreators, taskActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(null);
    const { showModal, changeModalTitle, changeModalContent } =
      modalActionCreators;
    showModal();
    changeModalTitle('Thêm mới công việc');
    changeModalContent(<TaskForm />);
  };

  loadData = () => {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  };

  showModalDeleteTask = (task) => {
    const { modalActionCreators, classes } = this.props;
    const { showModal, hideModal, changeModalTitle, changeModalContent } =
      modalActionCreators;
    showModal();
    changeModalTitle('Delete work');
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Are you sure?{' '}
          <span className={classes.modalConfirmTextBold}>{task.title}</span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDeleteTask(task)}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </div>,
    );
  };

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value,
          );
          return (
            <TaskList
              key={status.value}
              tasks={taskFiltered}
              status={status}
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard} id="1">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.loadData}
          style={{
            marginRight: 20,
          }}
        >
          Load Data
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon /> Add work
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    deleteTask: PropTypes.func,
  }),
  modalActionCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalTitle: PropTypes.func,
    changeModalContent: PropTypes.func,
  }),
  listTask: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard),
);
